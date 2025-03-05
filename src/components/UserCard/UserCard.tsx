import React from 'react';
import { Card, Avatar, Name, Description, DonateButton } from './UserCard.styles';

interface UserCardProps {
  avatar: string;
  name: string;
  description: string;
  onDonate?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  avatar,
  name,
  description,
  onDonate
}) => {
  return (
    <Card>
      <Avatar $src={avatar || '/default-avatar.png'} />
      <Name>{name}</Name>
      <Description>{description}</Description>
      <DonateButton onClick={onDonate}>
        Поддержать
      </DonateButton>
    </Card>
  );
};

export default UserCard;