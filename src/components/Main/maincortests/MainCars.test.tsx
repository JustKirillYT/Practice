import React from 'react';
import { render, screen } from '@testing-library/react';
import MainCarousel from './MainCars'; // Импортируем компонент, который тестируем

describe('MainCarousel', () => {
  it('should render the title and button correctly', () => {
    render(<MainCarousel />);

    // Проверяем, что заголовок рендерится
    const titleElement = screen.getByText(/Main Carousel/i);
    expect(titleElement).toBeInTheDocument();

    // Проверяем, что кнопка рендерится
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
