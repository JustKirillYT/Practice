import styled from 'styled-components';

export const Card = styled.div`
  width: 280px;
  min-height: 380px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 24px;
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid #cc8b36;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(204, 139, 54, 0.2);
  }

  @media (max-width: 768px) {
    width: 240px;
    min-height: 360px;
    padding: 16px;
  }
`;

export const Avatar = styled.div<{ $src: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(${props => props.$src}) center/cover;
  border: 3px solid #cc8b36;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
`;

export const Name = styled.h3`
  font-size: 1.25rem;
  color: #faa940;
  margin: 0 0 12px;
  text-align: center;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: rgba(255,255,255,0.9);
  text-align: center;
  line-height: 1.4;
  margin-bottom: 20px;
  flex-grow: 1;
`;

export const DonateButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #cc8b36, #faa940);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(204, 139, 54, 0.4);
  }
`;

