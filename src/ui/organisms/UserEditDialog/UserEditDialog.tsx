import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Logger from '@lib/utils/Logger';

import { useGetUser, useUpdateUser } from '@user/hooks/UseUser';

import { Button } from '@ui/atoms/Button';
import { Input } from '@ui/atoms/Input';
import { Label } from '@ui/atoms/Label';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@ui/molecules/Dialog';

type UserEditModalProps = {
	userId: number;
	open: boolean;
	onClose: () => void;
};

type UserInputProps = {
	label: string;
	val: string | number;
	onChange: (value: string | number) => void;
};

const IGNORED_KEYS = new Set(['id', 'key', 'love', 'address']);

const UserInput: FC<UserInputProps> = ({ label, val, onChange }) => (
	<div className="grid grid-cols-4 items-center gap-4">
		<Label htmlFor={label} className="capitalize">
			{label}
		</Label>
		<Input
			type="text"
			id={label}
			defaultValue={val}
			disabled={label === 'username'}
			onChange={(event) => onChange(event.target.value)}
			className="col-span-3"
		/>
	</div>
);

export const UserEditDialog: FC<UserEditModalProps> = ({
	userId,
	open,
	onClose,
}) => {
	const getUser = useGetUser();
	const updateUser = useUpdateUser(); // Using the updated hook

	const [newData, setNewData] = useState<any>({}); // Use 'any' temporarily, but replace with the appropriate type if known

	useEffect(() => {
		const userData = getUser(userId);
		if (userData) {
			setNewData(userData);
		}
	}, [getUser, userId]);

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleNestedChange = (object: any, path: string[], value: any) => {
		const objectCopy = { ...object };
		if (path.length === 0) return;

		const [firstKey, ...keys] = path;

		if (typeof firstKey !== 'string') {
			throw new TypeError('Expected firstKey to be a string');
		}

		if (!objectCopy[firstKey]) {
			objectCopy[firstKey] = {};
		}

		let ref = objectCopy[firstKey];

		keys.forEach((key, index) => {
			if (typeof ref !== 'object') {
				throw new TypeError('Expected ref to be an object');
			}

			if (!(key in ref)) {
				ref[key] = {};
			}

			if (index === keys.length - 1) {
				ref[key] = value;
			} else {
				ref = ref[key];
			}
		});

		// eslint-disable-next-line consistent-return
		return objectCopy;
	};

	const handleChange = (key: string, value: string | number) => {
		const keyParts = key.split('.');
		if (keyParts.length === 0) return;

		if (keyParts.length === 1) {
			setNewData((previousData: any) => ({
				...previousData,
				[key]: value,
			}));
		} else {
			// Use handleNestedChange for nested keys.
			setNewData((previousData: any) => {
				return handleNestedChange({ ...previousData }, keyParts, value);
			});
		}
	};

	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await updateUser(newData.id, newData); // This will now make the API call and update the local state
		} catch {
			Logger.log('Failed to update user:', '');
			// Optionally handle any additional error logic here
		}
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-xl">
				<DialogHeader>
					<DialogTitle>Edit user</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<form data-testid="edit-form" onSubmit={handleSave} className="grid gap-4 py-4">
					{Object.entries(newData).map(([key, value]) => {
						if (IGNORED_KEYS.has(key)) {
							return null;
						}
						if (typeof value === 'object' && value !== null) {
							const childData = value;

							return (
								<div className="grid gap-4 py-4" key={key}>
									<h3 className="text-xs uppercase text-gray-400">{key}</h3>
									{Object.entries(childData).map(([label_, value_]) => {
										return (
											<UserInput
												key={`${key}.${label_}`}
												label={label_}
												val={value_ as string | number}
												onChange={(value__: string | number) =>
													handleChange(`${key}.${label_}`, value__)
												}
											/>
										);
									})}
								</div>
							);
						}
						return (
							<UserInput
								key={key}
								label={key}
								val={value as string | number}
								onChange={(value_: string | number) =>
									handleChange(key, value_)
								}
							/>
						);
					})}
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
