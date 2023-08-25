import type { User } from '@user/entities/User';
import { usersAtom, usersErrorAtom } from '@user/state/UserAtoms';

export const mockUseAtom = (
  usersState: User[], 
  setUsersState: (newState: User[]) => void,
  errorState: Error | null,
  setErrorState: (newState: Error | null) => void
) => {
  return jest.fn().mockImplementation((atom) => {
    if (atom === usersAtom) {
      return [usersState, setUsersState];
    }
    if (atom === usersErrorAtom) {
      return [errorState, setErrorState];
    }
    // This default return will address the warning:
    return [null, () => {}];
  });
};
