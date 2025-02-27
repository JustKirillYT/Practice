import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Стили для контейнера шапки
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; // Распределяем элементы по ширине
  align-items: center; // Выравниваем элементы по вертикали
  padding: 10px 20px;
  background-color: #5c1313; // Темный фон, как на Donationalerts
  color: white;
`;

// Стили для логотипа
const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const A = styled.a`
    text-decoration:none;
    color:#1E1E1E;
    font-size:24pt;
`;
// Стили для навигационного меню
const Nav = styled.nav`
  display: flex;
  background-color:transparent;
  font-family:'Times New Roman', Times, serif;
  gap: 20px; // Расстояние между элементами меню
`;

// Стили для кнопок
const Buttons = styled.button`
  background-color: #00000083; // Красный цвет, как на Donationalerts
  color: white;
  border: none;
  margin-right:15px;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #bd3030; // Цвет при наведении
  }
`;

interface HeaderProps {
  onOpenAuthModal: () => void; // Функция для открытия модального окна
}

const Header: React.FC<HeaderProps> = ({ onOpenAuthModal }) => {
  return (
    <HeaderContainer>
      <Logo>ShareYourHappiness</Logo>
      <div>
        {/* Кнопка "Войти" открывает модальное окно */}
        <Buttons onClick={onOpenAuthModal}>Войти</Buttons>
          <Buttons>Регистрация</Buttons>
      </div>
    </HeaderContainer>
  );
};

export default Header;