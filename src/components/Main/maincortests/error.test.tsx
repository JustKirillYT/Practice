import { render, screen } from '@testing-library/react';
import MainCarousel from '../MainCarousel';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import { debug } from 'console';

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.onGet('http://localhost:3000/api/profiles/all').reply(500); // имитация ошибки 500
});

test('should display an error message if there is a problem fetching profiles', async () => {
  render(
    <MemoryRouter>
      <MainCarousel />
    </MemoryRouter>
  );

  // Используем findByText для поиска текста с ожиданием
  expect(await screen.findByText('Error fetching profiles:')).toBeInTheDocument();
});
