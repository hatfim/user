import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import { GetAllUsers } from '@application/useCases/GetAllUsers';
import { UserAPI } from '@services/api/UserApi';

import { User } from '@user/entities/User';
import { usersAtom, usersErrorAtom } from '@user/state/UserAtoms';

import { UserCard } from '@ui/organisms/UserCard';
import { UserEditDialog } from '@ui/organisms/UserEditDialog';

const userRepository = new UserAPI();
const getAllUsersUseCase = new GetAllUsers(userRepository);

export const UserList: React.FC = () => {
	const [users, setUsers] = useAtom(usersAtom);
	const [error, setError] = useAtom(usersErrorAtom);
	const [selectedUser, setSelectedUser] = useState<number | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		getAllUsersUseCase.execute().then((fetchedUsers) => {
			const userInstances = fetchedUsers.map((userData) => new User(userData));
			setUsers(userInstances);
		});
	}, [setUsers, setError]); // Removed `getAllUsersUseCase` since it's now invariant

	const handleEditModal = (id: number) => {
		setSelectedUser(id);
		setIsEditDialogOpen(!isEditDialogOpen);
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<section>
			<div className="grid grid-flow-row auto-rows-auto gap-4 md:grid-cols-2 lg:grid-cols-4">
				{users.map((user) => (
					<UserCard
						key={`user-${user.id}`}
						user={user}
						onEditClicked={handleEditModal}
					/>
				))}
			</div>
			{selectedUser !== null && (
				<UserEditDialog
					userId={selectedUser}
					open={isEditDialogOpen}
					onClose={() => setIsEditDialogOpen(false)}
				/>
			)}
		</section>
	);
};
