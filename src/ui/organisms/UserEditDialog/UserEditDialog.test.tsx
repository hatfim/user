import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import * as hooks from '@user/hooks/UseUser';

import { UserEditDialog } from './UserEditDialog';

jest.mock('@user/hooks/UseUser');
jest.mock('@lib/utils/Logger');
jest.mock('@services/api/UserApi', () => {
  return {
    UserAPI: jest.fn().mockImplementation(() => {
      return {
        patchUser: jest.fn(),
      };
    }),
  };
});

const mockUpdateUser = jest.fn();

describe('<UserEditDialog />', () => {

    beforeEach(() => {
      jest.spyOn(hooks, 'useUpdateUser').mockReturnValue(mockUpdateUser);

      (hooks.useGetUser as jest.Mock).mockReturnValue(() => ({
          id: 1,
          key: 'some_key',
          love: 'some_love',
          address: 'some_address',
          name: 'John Doe',
      }));
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders user data correctly', () => {
        render(<UserEditDialog userId={1} open onClose={jest.fn()} />);
        
        expect(screen.getByLabelText('name')).toHaveValue('John Doe');
    });

    it('updates user data on change', () => {
        render(<UserEditDialog userId={1} open onClose={jest.fn()} />);
        
        fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Jane Doe' } });

        expect(screen.getByLabelText('name')).toHaveValue('Jane Doe');
    });

    it('calls updateUser on save', async () => {
        render(<UserEditDialog userId={1} open onClose={jest.fn()} />);
        
        fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Jane Doe' } });
        fireEvent.submit(screen.getByTestId('edit-form'));
        
        await waitFor(() => {
          expect(mockUpdateUser).toHaveBeenCalledWith(1, expect.objectContaining({
            name: 'Jane Doe'
          }));
        });
    });

    it('does not render input fields for ignored keys', () => {
        render(<UserEditDialog userId={1} open onClose={jest.fn()} />);
        
        expect(screen.queryByLabelText('key')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('love')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('address')).not.toBeInTheDocument();
    });
});
