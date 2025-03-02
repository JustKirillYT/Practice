import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import UserCard from '../UserCard/UserCard';
import '../../styles/MainCarousel.css';

interface User {
  id: number;
  avatar: string;
  name: string;
  description: string;
}

const MainCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const users: User[] = [
    {
      id: 1,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Иван Иванов',
      description: 'Сбор на лечение',
    },
    {
      id: 2,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Мария Петрова',
      description: 'Сбор на образование',
    },
    {
      id: 3,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Алексей Сидоров',
      description: 'Сбор на путешествие',
    },
    {
      id: 4,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Ольга Кузнецова',
      description: 'Сбор на благотворительность',
    },
    {
      id: 5,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Дмитрий Васильев',
      description: 'Сбор на новый проект',
    },
    {
      id: 6,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Елена Смирнова',
      description: 'Сбор на лечение',
    },
    {
      id: 7,
      avatar: 'https://placehold.jp/3d4070/ffffff/150x150.png?css=%7B%22border-radius%22%3A%2215px%22%7D',
      name: 'Сергей Иванов',
      description: 'Сбор на образование',
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const getPosition = (index: number) => {
    const offset = (index - currentIndex + users.length) % users.length;
    if (offset === 0) return 'center';
    if (offset === 1) return 'right';
    if (offset === users.length - 1) return 'left';
    if (offset === 2) return 'far-right';
    if (offset === users.length - 2) return 'far-left';
    return 'hidden'; 
  };

  return (
    
    <div className="carousel-container" {...handlers}>
      
      <button className="carousel-arrow left" onClick={handlePrev}>&larr;</button>
      <div className="carousel">
        {users.map((user, index) => {
          const position = getPosition(index);
          return (
            <div
              key={user.id}
              className={`carousel-item ${position}`}
            >
              <UserCard
                avatar={user.avatar}
                name={user.name}
                description={user.description}
                isCenter={position === 'center'}
              />
            </div>
          );
        })}
      </div>
      <button className="carousel-arrow right" onClick={handleNext}>&rarr;</button>
    </div>
  );
};

export default MainCarousel;