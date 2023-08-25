import {
	Edit,
	Email,
	Favorite,
	FavoriteFilled,
	TrashCan,
	Wikis,
	Phone,
} from '@carbon/icons-react';
import type { FC } from 'react';

import Logger from '@lib/utils/Logger';

import type { User } from '@user/entities/User';
import { useDeleteUser, useUpdateUser } from '@user/hooks/UseUser';


import { Avatar, AvatarFallback, AvatarImage } from '@ui/atoms/Avatar';
import { Button } from '@ui/atoms/Button';
import { Separator } from '@ui/atoms/Separator';
import { Tag } from '@ui/atoms/Tag';
import { Card, CardContent, CardFooter, CardHeader } from '@ui/molecules/Card';



// Instantiate outside the component scope
type UserCardProps = {
	user: User;
	onEditClicked: (id: number) => void;
};

export const UserCard: FC<UserCardProps> = ({ user, onEditClicked }) => {
	const tags = user.company.bs.split(' ');
	const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

	const toggleLove = async () => {
		try {
			await updateUser(user.id, { ...user, love: !user.love ?? false }); // This will now make the API call and update the local state
		} catch {
			Logger.log('Failed to update user:', '');
		}
	};
	const handleEditClicked = (userID: number) => {
		onEditClicked(userID); 
	};

	const handleDelete = (userID: number) => {
    deleteUser(userID);
  };

	return (
			<Card className="flex h-full flex-col justify-between">
				<CardHeader className="relative pb-2">
					<Avatar data-testid="user-avatar" className="h-16 w-16" data-test>
						<AvatarImage src={user.avatar} alt={user.username} />
						<AvatarFallback>{user.username}</AvatarFallback>
					</Avatar>
					<div className="absolute right-2 top-2">
						<Button data-testid="love-button" variant="ghost" className="px-1" onClick={toggleLove}>
							{user.love ? (
								<FavoriteFilled className="h-6 w-6" />
							) : (
								<Favorite className="h-6 w-6" />
							)}
						</Button>
					</div>
				</CardHeader>
				<CardContent className="">
					<h3 data-testid="user-name" className="max-h-8 w-full overflow-hidden text-2xl font-bold tracking-wide">
						{user.name}
					</h3>
					<p data-testid="user-username" className="text-sm text-gray-400">@{user.username}</p>
					<div className="flex w-full items-center justify-between pt-4">
						<div>
							<a
                data-testid="link-website"
								href={user.website}
								target="_blank"
								rel="noopener noreferrer"
								className="mr-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted"
							>
								<Wikis className="h-6 w-6" />
							</a>
							<a
                data-testid="link-email"
								href={`mailto:${user.email}`}
								className="inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted "
							>
								<Email className="h-6 w-6" />
							</a>
						</div>
						<a
              data-testid="link-phone"
							href={`tel:${user.phone}`}
							className="inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted "
						>
							<Phone className="h-6 w-6" />
						</a>
					</div>
					<Separator className="my-8" />
					<p className="text-xs tracking-wider text-gray-400">COMPANY</p>
					<p data-testid="user-company-name" className="font-semibold">{user.company.name}</p>
					<p  data-testid="user-company-catchprase"className="text-xs text-gray-400">{user.company.catchPhrase}</p>
          <div className="mt-4">
            {tags.map((tag) => (
              <Tag key={tag} className="bg-muted text-primary">
                {tag}
              </Tag>
            ))}
          </div>
				</CardContent>
				<CardFooter className="grid grid-cols-2 gap-2">
          <Button data-testid="button-edit" onClick={() => handleEditClicked(user.id)}>
            <Edit />
            Edit
          </Button>
          <Button data-testid="button-delete" onClick={() => handleDelete(user.id)}>
            <TrashCan />
            Delete
          </Button>
        </CardFooter>
			</Card>
	);
};
