import { render, screen } from '@testing-library/react';
import MainCarousel from '../MainCarousel';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

const mock = new MockAdapter(axios);
const mockUsers = [
  { id: 1, avatar: '/avatar1.png', name: 'User 1', purpose: 'Helping others', userid: 1 },
  { id: 2, avatar: '/avatar2.png', name: 'User 2', purpose: 'Making the world better', userid: 2 },
];

beforeEach(() => {
  mock.onGet('http://localhost:3000/api/profiles/all').reply(200, mockUsers);
});

test('should render users in carousel', async () => {
  render(
    <MemoryRouter>
      <MainCarousel />
    </MemoryRouter>
  );

  // Используем findByText для поиска текста с ожиданием
  expect(await screen.findByText('User 1')).toBeInTheDocument();
  expect(await screen.findByText('User 2')).toBeInTheDocument();
});
