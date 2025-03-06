import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MainCarousel from './MainCarousel';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUsers = [
  {
    id: 15,
    name: 'Искандер',
    purpose: 'Заглушка',
    avatar: 'http://example.com/avatar1.jpg',
    userid: 2,
  },
  
];

describe('MainCarousel Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockUsers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    render(
      <MemoryRouter>
        <MainCarousel />
      </MemoryRouter>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays user cards after successful fetch', async () => {
    render(
      <MemoryRouter>
        <MainCarousel />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('handles API error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    console.error = jest.fn();

    render(
      <MemoryRouter>
        <MainCarousel />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching profiles:', expect.any(Error));
    });
  });
});