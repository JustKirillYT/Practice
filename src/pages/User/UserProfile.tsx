import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100');
  const [background, setBackground] = useState('https://via.placeholder.com/400x200');
  const [balance, setBalance] = useState(1000); // Пример баланса

  // Обработчик изменения аватарки
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Обработчик изменения фона
  const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  // Обработчик пожертвования
  const handleDonate = () => {
    alert('Спасибо за пожертвование!');
  };

  return (
    <div className="profile-container">
      <h1>Мой профиль</h1>

      {/* Загрузка аватарки */}
      <label className="avatar-label">
        Загрузить аватарку
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="avatar-upload"
        />
      </label>

      {/* Загрузка фона */}
      <label className="background-label">
        Загрузить фон
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundChange}
          className="background-upload"
        />
      </label>

      {/* Фон и информация о пользователе */}
      <div className="profile-background" style={{ backgroundImage: `url(${background})` }}>
        <div className="profile-info">
          <img src={avatar} alt="Avatar" className="profile-avatar" />
          <h2 className="profile-name">Иван Иванов</h2>
          <p className="profile-description">Привет! Я люблю программирование.</p>
          <button className="donate-button" onClick={handleDonate}>
            Поддержать
          </button>
        </div>
      </div>

      {/* Блок баланса */}
      <div className="balance-block">
        <h3 className="balance-title">Ваш баланс</h3>
        <p className="balance-amount">{balance} ₽</p>
      </div>
    </div>
  );
};

export default UserProfile;