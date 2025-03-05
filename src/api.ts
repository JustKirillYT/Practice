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


api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

// Получить профиль по ID пользователя
export const getProfileByUserId = async (userId: number): Promise<any> => {
  try {
    const response = await api.get(`/profile/user/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка получения профиля');
    }
    throw new Error('Неизвестная ошибка');
  }
};

export const updateProfile = async (profileData: any): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await api.put('/profile/update', profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка обновления профиля');
    }
    throw new Error('Неизвестная ошибка');
  }
};