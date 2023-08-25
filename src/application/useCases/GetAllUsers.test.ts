import Logger from '@lib/utils/Logger';

import { UsersMock } from '@user/__mocks__/UserMockData';
import type { UserRepository } from '@user/repositories/UserRepository';

import { GetAllUsers } from './GetAllUsers';

// Mocking Logger methods for assertion
jest.mock('@lib/utils/logger', () => ({
	error: jest.fn(),
	log: jest.fn(),
}));

// Mocking UserRepository for controlling its behavior
const mockUserRepository: jest.Mocked<UserRepository> = {
	patchUser: jest.fn(),
	deleteUser: jest.fn(),
	getAllUsers: jest.fn(),
};

describe('GetAllUsers UseCase', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('fetches users successfully', async () => {
		mockUserRepository.getAllUsers.mockResolvedValueOnce(UsersMock);

		const getAllUsersUseCase = new GetAllUsers(mockUserRepository);
		const result = await getAllUsersUseCase.execute();

		expect(result).toEqual(UsersMock);
	});

	it('logs and rethrows error on fetch failure', async () => {
		const error = new Error('Fetch failed');
		mockUserRepository.getAllUsers.mockRejectedValueOnce(error);

		const getAllUsersUseCase = new GetAllUsers(mockUserRepository);

		await expect(getAllUsersUseCase.execute()).rejects.toThrow(error);
		expect(Logger.error).toHaveBeenCalledWith('Error fetching users', error);
	});

	it('logs unexpected error and rethrows', async () => {
		const unexpectedError = 'An unexpected error';
		mockUserRepository.getAllUsers.mockRejectedValueOnce(unexpectedError);

		const getAllUsersUseCase = new GetAllUsers(mockUserRepository);

		await expect(
			getAllUsersUseCase.execute()
		).rejects.toThrowErrorMatchingSnapshot();
		expect(Logger.log).toHaveBeenCalledWith(
			'An unexpected error occurred:',
			unexpectedError
		);
	});

	it('throws error when user data format is invalid', async () => {
		// An example of data that doesn't match the expected format
		const invalidUsersMock = [{ invalidKey: 'invalidValue' }];
		mockUserRepository.getAllUsers.mockResolvedValueOnce(
			invalidUsersMock as any
		);

		const getAllUsersUseCase = new GetAllUsers(mockUserRepository);

		await expect(getAllUsersUseCase.execute()).rejects.toThrow(
			'Received invalid user data format'
		);
		expect(Logger.error).toHaveBeenCalledWith(
			'Error fetching users',
			expect.any(Error)
		);
	});
});
