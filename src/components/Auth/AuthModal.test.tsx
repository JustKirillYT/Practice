import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthModal from './AuthModal';
import { loginUser, registerUser } from '../../api';
import userEvent from '@testing-library/user-event';

jest.mock('../../api');
const mockedLoginUser = loginUser as jest.Mock;
const mockedRegisterUser = registerUser as jest.Mock;

describe('AuthModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders login form by default', () => {
    render(
      <AuthModal isOpen={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );
    
    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByLabelText('Логин:')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль:')).toBeInTheDocument();
  });

  test('switches between login and registration modes', () => {
    render(
      <AuthModal isOpen={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    fireEvent.click(screen.getByText('Нет аккаунта? Зарегистрироваться'));
    expect(screen.getByText('Регистрация')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Уже есть аккаунт? Войти'));
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });

  test('validates password on registration', async () => {
    render(
      <AuthModal isOpen={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    // Switch to registration
    fireEvent.click(screen.getByText('Нет аккаунта? Зарегистрироваться'));

    // Test short password
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Зарегистрироваться'));
    expect(await screen.findByText('Пароль должен содержать минимум 6 символов')).toBeInTheDocument();

    // Test missing uppercase
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'nouppercase1' } });
    expect(await screen.findByText('Пароль должен содержать хотя бы одну заглавную букву')).toBeInTheDocument();

    // Test missing lowercase
    fireEvent.change(screen.getByLabelText('Пароль:'), { target: { value: 'NOLOWERCASE1' } });
    expect(await screen.findByText('Пароль должен содержать хотя бы одну строчную букву')).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockUserData = {
      user: { id: 1, login: 'testuser', avatarUrl: 'http://example.com/avatar.jpg' },
      token: 'fake-token'
    };
    mockedLoginUser.mockResolvedValue(mockUserData);

    render(
      <AuthModal isOpen={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    userEvent.type(screen.getByLabelText('Логин:'), 'testuser');
    userEvent.type(screen.getByLabelText('Пароль:'), 'ValidPass123');
    fireEvent.click(screen.getByText('Войти'));

    await waitFor(() => {
      expect(localStorage.getItem('user')).toEqual(JSON.stringify({
        id: 1,
        login: 'testuser',
        avatarUrl: 'http://example.com/avatar.jpg',
        token: 'fake-token'
      }));
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockOnLogin).toHaveBeenCalled();

    });
  });

  test('handles API errors', async () => {
    mockedLoginUser.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <AuthModal isOpen={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    userEvent.type(screen.getByLabelText('Логин:'), 'wronguser');
    userEvent.type(screen.getByLabelText('Пароль:'), 'wrongpass');
    fireEvent.click(screen.getByText('Войти'));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});