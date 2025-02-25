import React, { useState } from 'react';
import styled from 'styled-components';
import UserCard from '../../components/UserCard/UserCard';

const ProfileContainer = styled.div`
  padding: 20px;
`;

const Background = styled.div<{ background: string }>`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 8px;
`;

const AvatarUpload = styled.input`
  margin-bottom: 20px;
`;

const BackgroundUpload = styled.input`
  margin-bottom: 20px;
`;

const UserProfile = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100');
  const [background, setBackground] = useState('https://via.placeholder.com/400x200');

  // Указываем тип для event
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Используем optional chaining на случай, если files = null
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Указываем тип для event
  const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Используем optional chaining
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  const handleDonate = () => {
    alert('Спасибо за пожертвование!');
  };

  return (
    <ProfileContainer>
      <h1>Мой профиль</h1>
      <AvatarUpload type="file" accept="image/*" onChange={handleAvatarChange} />
      <BackgroundUpload type="file" accept="image/*" onChange={handleBackgroundChange} />
      <Background background={background}>
        <UserCard
          avatar={avatar}
          name="Иван Иванов"
          description="Привет! Я люблю программирование."
          onDonate={handleDonate}
        />
      </Background>
    </ProfileContainer>
  );
};

export default UserProfile;