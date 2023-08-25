import { atom } from 'jotai';

import type { User } from '@user/entities/User';

export const usersAtom = atom<User[]>([]);
export const usersErrorAtom = atom<Error | null>(null);
