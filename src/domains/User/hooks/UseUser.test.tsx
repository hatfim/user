import { renderHook, act } from '@testing-library/react-hooks';
import { Provider, useAtom } from 'jotai';
import type { ReactNode } from 'react';
import React from 'react';

import { UserAPI } from '@services/api/UserApi';

import { UserMock } from '@user/__mocks__/UserMockData';

import { useUpdateUser, useGetUser, useDeleteUser } from './UseUser';

jest.mock('@services/api/UserApi');
jest.mock('@lib/utils/Logger');
jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtom: jest.fn(),
}));

describe('User Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Define the type for the wrapper function
  type WrapperProps = {
    children: ReactNode;
  };

  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Provider>{children}</Provider>
  );

  it('updates a user with useUpdateUser', async () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current(UserMock.id, { name: 'Jane Doe' });
    });

    expect(UserAPI.prototype.patchUser).toHaveBeenCalledWith(UserMock.id, {
      name: 'Jane Doe',
    });
  });

  it('gets a user with useGetUser', () => {

    // Set the mock value for usersAtom
    (useAtom as jest.Mock).mockReturnValue([[UserMock], jest.fn()]);

    const { result } = renderHook(() => useGetUser());
    const user = result.current(1);

    expect(user).toEqual(UserMock);

  });

  it('deletes a user with useDeleteUser', async () => {
    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current(UserMock.id);
    });

    expect(UserAPI.prototype.deleteUser).toHaveBeenCalledWith(UserMock.id);
  });
});
