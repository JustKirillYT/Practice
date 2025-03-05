import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import UserCard from '../UserCard/UserCard';
import '../../styles/MainCarousel.css';
import { styled } from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Импортируем Link

interface UserProfile {
  id: number;
  avatar: string;
  name: string;
  purpose: string; // поле из вашей сущности UserProfile
  userid: number;
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  padding: 20px 0;
`;

const SliderTrack = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SlideWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
  width: 20%;
  padding: 0 10px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  @media (max-width: 1024px) {
    width: 33.333%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  &.left { left: 20px; }
  &.right { right: 20px; }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`;

const MainCarousel: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get<UserProfile[]>('http://localhost:3000/api/profiles/all');
        
        // Преобразование данных под интерфейс компонента
        const transformedData = response.data.map(profile => ({
          ...profile,
          avatar: profile.avatar || 'https://placehold.jp/3d4070/ffffff/150x150.png',
          goal: profile.purpose // переименовываем поле purpose в goal
        }));

        setUsers(transformedData);
      } catch (err) {
        setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) setVisibleCards(1);
      else if (window.innerWidth <= 1024) setVisibleCards(3);
      else setVisibleCards(5);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % users.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + users.length) % users.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const getSlidePosition = (index: number) => {
    const offset = ((index - currentIndex) % users.length + users.length) % users.length;
    const position = offset > users.length / 2 ? offset - users.length : offset;
    const isVisible = Math.abs(position) <= Math.floor(visibleCards / 2);

    let transform = 'translateX(0) scale(1)';
    let opacity = 1;
    let zIndex = 5;

    if (visibleCards === 1) {
      transform = position === 0 ? 'translateX(0)' : `translateX(${position > 0 ? '100%' : '-100%'})`;
      opacity = position === 0 ? 1 : 0;
    } else {
      const scale = 1 - Math.abs(position) * 0.1;
      const translate = position * 100;
      transform = `translateX(${translate}%) scale(${scale})`;
      opacity = 1 - Math.abs(position) * 0.3;
      zIndex = visibleCards - Math.abs(position);
    }

    return {
      transform,
      opacity,
      zIndex,
      isVisible: isVisible || Math.abs(position) === visibleCards,
    };
  };

  return (
    <SliderContainer {...handlers}>
      <ArrowButton className="left" onClick={handlePrev}>&larr;</ArrowButton>

      <SliderTrack>
        {users.map((user, index) => {
          const position = getSlidePosition(index);
          const isActive = position.zIndex === visibleCards;
          
          return (
            <SlideWrapper
              key={user.id}
              $visible={position.isVisible}
              style={{
                transform: position.transform,
                opacity: position.opacity,
                zIndex: position.zIndex,
              }}
              onTransitionEnd={() => setIsAnimating(false)}
            >
              <Link to={isActive ? `/profiles/${user.userid}` : '#'} style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
                <UserCard
                  avatar={user.avatar}
                  name={user.name}
                  description={user.purpose}
                  isActive={isActive}
                />
              </Link>
            </SlideWrapper>
          );
        })}
      </SliderTrack>

      <ArrowButton className="right" onClick={handleNext}>&rarr;</ArrowButton>
    </SliderContainer>
  );
};

export default MainCarousel;
