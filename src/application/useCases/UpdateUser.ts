import Logger from '@lib/utils/Logger';

import { UserDataSchema } from '@user/entities/UserSchema';
import type { UserData } from '@user/entities/UserTypes';
import type { UserRepository } from '@user/repositories/UserRepository';

export interface UpdateUserUseCase {
	execute(userId: number, updatedData: Partial<UserData>): Promise<UserData>;
}

export class UpdateUser implements UpdateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(
		userId: number,
		updatedData: Partial<UserData>
	): Promise<UserData> {
		try {
			const updatedUser = await this.userRepository.patchUser(
				userId,
				updatedData
			);

			// Validate the updated user against the schema
			if (!UserDataSchema.safeParse(updatedUser).success) {
				throw new Error('Received invalid user data format after updating');
			}

			return updatedUser;
		} catch (error) {
			if (error instanceof Error) {
				Logger.error('Error updating user', error);
			} else {
				Logger.log('An unexpected error occurred:', error);
			}
			throw error;
		}
	}
}
