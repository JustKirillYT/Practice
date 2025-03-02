import React from 'react';
import styled from 'styled-components';

interface UserCardProps {
  avatar: string; // Ссылка на аватарку
  name: string; // Имя пользователя
  description: string; // Описание
  isCenter?: boolean; // Флаг, указывающий, что карточка центральная
}

const CardContainer = styled.div<{ isCenter?: boolean }>`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: ${({ isCenter }) => (isCenter ? '250px' : '200px')};
  height: ${({ isCenter }) => (isCenter ? '250px' : '200px')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: ${({ isCenter }) => (isCenter ? 'pointer' : 'default')};
  opacity: ${({ isCenter }) => (isCenter ? '1' : '0.6')};
  filter: ${({ isCenter }) => (isCenter ? 'none' : 'brightness(0.8)')};
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const Name = styled.h3`
  margin: 10px 0;
`;

const Description = styled.p`
  color: #666;
`;

const UserCard = ({ avatar, name, description, isCenter }: UserCardProps) => {
  return (
    <CardContainer isCenter={isCenter}>
      <Avatar src={avatar} alt={name} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </CardContainer>
  );
};

export default UserCard;