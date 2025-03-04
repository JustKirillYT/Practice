import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Убедитесь, что URL правильный

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AuthData {
  login: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    login: string;
    avatarUrl: string;
  };
}

// Вход
export const loginUser = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/login', data); // Путь /login
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка входа');
    }
    throw new Error('Неизвестная ошибка');
  }
};

// Регистрация
export const registerUser = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/register', data); // Путь /register
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации');
    }
    throw new Error('Неизвестная ошибка');
  }
};