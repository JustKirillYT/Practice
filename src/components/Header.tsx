import React from 'react';
import '../styles/Header.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Logo from '../logo.svg';
import {Link, Route, Routes} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header div content">
        <div className="header div logo">
          <Link to="/">
        <img src={Logo} className="logo" alt="Картинка"/> 
        </Link>
      </div>
      <div className="div signin border">
        <Link to="/UserProfile">
      <button className="button withdesign">Профиль</button>
      </Link>
      <Link to="/Register">
      <button>Регистрация</button>
      </Link>
      </div>
      </div>
    </header>
  );
};

export default Header;