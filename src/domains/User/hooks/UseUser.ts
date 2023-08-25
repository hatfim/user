import { useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { ApiError } from '@lib/utils/ApiError';
import Logger from '@lib/utils/Logger';
import { UserAPI } from '@services/api/UserApi';

import type { User } from '@user/entities/User';
import { usersAtom } from '@user/state/UserAtoms';

export function useUpdateUser() {
	const setUsers = useSetAtom(usersAtom);

	const updateUser = useCallback(
		async (userID: number, updatedFields: Partial<User>) => {
			const userAPI = new UserAPI();

			try {
				await userAPI.patchUser(userID, updatedFields); // Assuming patchUser method exists in UserAPI
			} catch (error) {
				if (error instanceof ApiError) {
					Logger.error('API Error:', error);
				}
			}

			// Set Users move to here because typicode always sent error
			setUsers((previousUsers) => {
				return previousUsers.map((user) => {
					if (user.id === userID) {
						return { ...user, ...updatedFields };
					}
					return user;
				});
			});
		},
		[setUsers]
	);

	return updateUser;
}
export function useGetUser() {
	const [users] = useAtom(usersAtom);

	const getUser = useCallback(
		(userID: number): User | undefined => {
			return users.find((user: User) => user.id === userID);
		},
		[users]
	);

	return getUser;
}

export function useDeleteUser() {
	const setUsers = useSetAtom(usersAtom);

	const deleteUser = useCallback(
		async (userID: number) => {
			const userAPI = new UserAPI();

			try {
				await userAPI.deleteUser(userID);
			} catch (error) {
				if (error instanceof ApiError) {
					Logger.error('API Error:', error);
				}
			}
			// Set Users move to here because typicode always sent error
			setUsers((previousUsers) => {
				return previousUsers.filter((user) => user.id !== userID);
			});
		},
		[setUsers]
	);

	return deleteUser;
}
