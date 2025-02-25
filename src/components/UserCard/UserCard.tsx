import React from 'react';
import styled from 'styled-components';

interface UserCardProps {
  avatar: string; // Ссылка на аватарку
  name: string; // Имя пользователя
  description: string; // Описание
  onDonate: () => void; // Обработчик клика на кнопку "Пожертвовать"
}

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  max-width: 200px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Name = styled.h3`
  margin: 10px 0;
`;

const Description = styled.p`
  color: #666;
`;

const DonateButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const UserCard = ({ avatar, name, description, onDonate }: UserCardProps) => {
  return (
    <CardContainer>
      <Avatar src={avatar} alt={name} />
      <Name>{name}</Name>
      <Description>{description}</Description>
      <DonateButton onClick={onDonate}>Пожертвовать</DonateButton>
    </CardContainer>
  );
};

export default UserCard;