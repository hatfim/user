import { useAtom } from 'jotai';
import React, { useEffect } from 'react';

import { GetAllUsers } from '@application/useCases/GetAllUsers';
import Logger from '@lib/utils/Logger';
import { UserAPI } from '@services/api/UserApi';

import { User } from '@user/entities/User';
import { usersAtom, usersErrorAtom } from '@user/state/UserAtoms';

// Instantiate outside the component scope
const userRepository = new UserAPI();
const getAllUsersUseCase = new GetAllUsers(userRepository);

export const Members: React.FC = () => {
	const [users, setUsers] = useAtom(usersAtom);
	const [error, setError] = useAtom(usersErrorAtom);

	useEffect(() => {
		getAllUsersUseCase
			.execute()
			.then((fetchedUsers) => {
				const userInstances = fetchedUsers.map(
					(userData) => new User(userData)
				);
				setUsers(userInstances);
			})
			.catch((error_) => {
				setError(error_);
				Logger.error('Fetch ERROR', error_);
			});
	}, [setUsers, setError]); // Removed `getAllUsersUseCase` since it's now invariant

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>List of Users</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.name} ({user.avatar})
					</li>
				))}
			</ul>
		</div>
	);
};
