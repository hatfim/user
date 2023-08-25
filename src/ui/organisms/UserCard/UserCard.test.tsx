import { render, fireEvent, act } from '@testing-library/react';
import { beforeEach } from 'node:test';

import { useDeleteUser, useUpdateUser } from '@domains/User/hooks/UseUser';

import { UserCard } from './UserCard';

jest.mock('@domains/User/hooks/UseUser', () => ({
  useUpdateUser: jest.fn(),
  useDeleteUser: jest.fn()
}));

describe('<UserCard />', () => {
  const mockUser = {
    id: 1,
    avatar: 'path/to/avatar.jpg',
    username: 'testUser',
    name: 'Test User',
    website: 'https://example.com',
    email: 'test@example.com',
    phone: '123-456-7890',
    address: {
			street: 'Kulas Light',
			suite: 'Apt. 556',
			city: 'Gwenborough',
			zipcode: '92998-3874',
			geo: {
				lat: '-37.3159',
				lng: '81.1496',
			},
		},
    company: {
      name: 'Test Co.',
      catchPhrase: 'Testing is fun!',
      bs: 'test1 test2'
    },
    love: false
  };

  const mockOnEditClicked = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useUpdateUser as jest.Mock).mockReturnValue(jest.fn());
    (useDeleteUser as jest.Mock).mockReturnValue(jest.fn());
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<UserCard user={mockUser} onEditClicked={mockOnEditClicked} />);
    
    expect(getByTestId('user-avatar')).toBeTruthy();
    expect(getByTestId('user-name').textContent).toBe(mockUser.name);
    expect(getByTestId('user-username').textContent).toBe(`@${mockUser.username}`);
    expect(getByTestId('user-company-name').textContent).toBe(mockUser.company.name);
    expect(getByTestId('user-company-catchprase').textContent).toBe(mockUser.company.catchPhrase);
  });

  it('handles love button click', async () => {
    const mockUpdateUser = jest.fn();
    (useUpdateUser as jest.Mock).mockReturnValue(mockUpdateUser);
    
    const { getByTestId } = render(<UserCard user={mockUser} onEditClicked={mockOnEditClicked} />);
    
    const loveButton = getByTestId('love-button');
    
    await act(async () => {
      fireEvent.click(loveButton);
    });

    expect(mockUpdateUser).toHaveBeenCalledWith(mockUser.id, { ...mockUser, love: true });
  });

  it('handles delete button click', async () => {
    const mockDeleteUser = jest.fn();
    (useDeleteUser as jest.Mock).mockReturnValue(mockDeleteUser);
    
    const { getByTestId } = render(<UserCard user={mockUser} onEditClicked={mockOnEditClicked} />);
    
    const deleteButton = getByTestId('button-delete');
    
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(mockDeleteUser).toHaveBeenCalledWith(mockUser.id);
  });

  it('calls onEditClicked when edit button is clicked', () => {
    const handleEditClicked = jest.fn();
    const { getByTestId } = render(
      <UserCard user={mockUser} onEditClicked={handleEditClicked} />
    );

    fireEvent.click(getByTestId('button-edit'));

    expect(handleEditClicked).toHaveBeenCalledWith(mockUser.id);
  });

});