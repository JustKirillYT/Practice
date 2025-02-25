import React from 'react';
import '..//..//styles/HeroSec.css'; // Стили для Hero-секции

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Собирайте средства легко и безопасно</h1>
        <p>Помогайте проектам, поддерживайте близких, реализуйте мечты</p>
        <div className="hero-buttons">
          <button className="primary-button">Начать сбор</button>
          <button className="secondary-button">Найти проект</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;