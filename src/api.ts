import axios from 'axios';
import { StringLiteral } from 'typescript';

const API_BASE_URL = 'http://localhost:3000';

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

 export const registerUser = async (data: { login: string; password: string }) => {
  const response = await api.post('/register', data);
  return response.data; // { token: string, user: { login: string, avatarUrl: string } }
};

// Вход
export const loginUser = async (data: { login: string; password: string }) => {
  const response = await api.post('/login', data);
  return response.data; // { token: string, user: { login: string, avatarUrl: string } }
};
