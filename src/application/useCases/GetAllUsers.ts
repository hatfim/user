import Logger from '@lib/utils/Logger';

import { UserDataSchema } from '@user/entities/UserSchema';
import type { UserData } from '@user/entities/UserTypes';
import type { UserRepository } from '@user/repositories/UserRepository';

export interface GetAllUsersUseCase {
	execute(): Promise<UserData[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<UserData[]> {
		try {
			const users = await this.userRepository.getAllUsers();

			// Validate users against the schema
			if (!UserDataSchema.array().safeParse(users).success) {
				throw new Error('Received invalid user data format');
			}

			return users;
		} catch (error) {
			// Handle errors, perhaps logging or some other side effects.
			if (error instanceof Error) {
				Logger.error('Error fetching users', error);
			} else {
				// Handle or log non-Error thrown values
				Logger.log('An unexpected error occurred:', error);
			}
			throw error;
		}
	}
}
