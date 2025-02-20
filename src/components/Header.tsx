import React from 'react';
import '../styles/Header.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Logo from '../logo.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={Logo} className="logo" alt="Картинка"></img>
      <nav>
        <u>
            <li>Text1</li>
            <li>Text2</li>
            <li>Text3</li>
            <li>Text4</li>
        </u>
      </nav>
    </header>
  );
};

export default Header;