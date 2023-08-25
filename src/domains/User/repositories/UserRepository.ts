import type { User } from '@user/entities/User';
import type { UserData } from '@user/entities/UserTypes';

export interface UserRepository {
	patchUser(userId: number, updatedData: Partial<User>): Promise<User>;
	deleteUser(userId: number): Promise<void>;
	getAllUsers(): Promise<Array<UserData>>;
}
