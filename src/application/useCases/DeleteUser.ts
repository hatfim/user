import Logger from '@lib/utils/Logger';

import type { UserRepository } from '@user/repositories/UserRepository';

export interface DeleteUserUseCase {
	execute(userId: number): Promise<void>;
}

export class DeleteUser implements DeleteUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(userId: number): Promise<void> {
		try {
			await this.userRepository.deleteUser(userId);
		} catch (error) {
			if (error instanceof Error) {
				Logger.error('Error deleting user', error);
			} else {
				Logger.log('An unexpected error occurred:', error);
			}
			throw error;
		}
	}
}
