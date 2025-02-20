import React from 'react';
import '../styles/BorderBar.css';
import { Link } from 'react-router-dom';

const Borderbar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="UserProfile">Профиль</Link></li>
      </ul>
    </aside>
  );
};

export default Borderbar;