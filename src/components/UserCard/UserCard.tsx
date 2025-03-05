// UserCard.tsx
import styled from 'styled-components';

interface UserCardProps {
  avatar: string;
  name: string;
  description: string;
  isActive?: boolean;
}

const CardContainer = styled.div<{ isActive?: boolean }>`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin: 0 auto;
  width: 100%;
  transform: ${({ isActive }) => (isActive ? 'scale(1)' : 'scale(0.9)')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.7)};
  filter: ${({ isActive }) => (isActive ? 'none' : 'brightness(0.95)')};

  @media (max-width: 480px) {
    padding: 15px;
    transform: none !important;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const Name = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  line-height: 1.4;
`;

const UserCard: React.FC<UserCardProps> = ({ avatar, name, description, isActive }) => {
  return (
    <CardContainer isActive={isActive}>
      <Avatar src={avatar} alt={name} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </CardContainer>
  );
};

export default UserCard;