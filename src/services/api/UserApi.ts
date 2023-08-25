/* eslint-disable class-methods-use-this */
import { api } from '@lib/utils/FetchUtils';
import Logger from '@lib/utils/Logger';

import { User } from '@user/entities/User';
import { UserDataSchema } from '@user/entities/UserSchema';
import type { UserRepository } from '@user/repositories/UserRepository';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export class UserAPI implements UserRepository {
	async getAllUsers(): Promise<Array<User>> {
		try {
			const response = await api(BASE_URL, { method: 'GET' });
			// Validate the response with zod
			const usersData = UserDataSchema.array().parse(response);

			return usersData.map((userData) => new User(userData));
		} catch (error) {
			if (error instanceof Error) {
				Logger.error('Error fetching users', error);
			} else {
				// Handle or log non-Error thrown values
				Logger.log('An unexpected error occurred:', error);
			}
			throw error;
		}
	}

	async patchUser(userId: number, updatedData: Partial<User>): Promise<User> {
		try {
			const response = await api(`${BASE_URL}/${userId}`, {
				method: 'PATCH',
				body: JSON.stringify(updatedData),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});

			// Validate the response with zod
			const userData = UserDataSchema.parse(response);
			return new User(userData);
		} catch (error) {
			if (error instanceof Error) {
				Logger.error(`Error patching user with ID ${userId}`, error);
			} else {
				// Handle or log non-Error thrown values
				Logger.log('An unexpected error occurred:', error);
			}
			throw error;
		}
	}

	async deleteUser(userId: number): Promise<void> {
		try {
			await api(`${BASE_URL}/${userId}`, {
				method: 'DELETE',
			});
		} catch (error) {
			if (error instanceof Error) {
				Logger.error(`Error deleting user with ID ${userId}`, error);
			} else {
				// Handle or log non-Error thrown values
				Logger.log('An unexpected error occurred:', error);
			}
			throw error;
		}
	}
}
