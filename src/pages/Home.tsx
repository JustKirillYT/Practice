import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../styles/Header.css';
function Home() {
    return (
      <div>
    
        <li> <Link to="/">Главная</Link></li>
        <li>  <Link to="/UserProfile">Профиль</Link></li>
        <li><Link to="/Home">Home</Link></li>
        <h1>Главная страница</h1>
        <p>Добро пожаловать в приложение для пожертвований!</p>
      </div>
    );
  }
  
  export default Home;