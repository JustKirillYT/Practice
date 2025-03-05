import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 4rem 0;
  background: linear-gradient(45deg, #000000da, #000000);
  overflow: hidden;
`;

export const Track = styled.div<{ $transition: boolean }>`
  display: flex;
  transition: ${({ $transition }) => 
    $transition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
  will-change: transform;
  padding: 0 20px;
`;

export const CardWrapper = styled.div`
  flex: 0 0 280px;
  min-width: 0;
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    flex: 0 0 33.33%;
    max-width: 33.33%;
    padding: 0 8px;
  }

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0;
  }
`;

export const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(204, 139, 54, 0.9);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);

  &:hover {
    background: #faa940;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev { left: 20px; }
  &.next { right: 20px; }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
`;

export const Dot = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? '#faa940' : '#cc8b36'};
  cursor: pointer;
  transition: all 0.3s ease;
`;