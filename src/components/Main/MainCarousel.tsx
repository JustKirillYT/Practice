import React from 'react';
import UserCard from "../UserCard/UserCard"
import '..//../styles/MainCarousel.css';

const handleDonate = () => {
    alert('Спасибо за пожертвование!');
  };

const MainCarousel: React.FC = () => {
  return (
    <div className='background'>
        <h1 className="h1">Случайные пользователи и их сборы</h1>
    <div className='carousel UserCard'>
    <UserCard
        avatar='..//../logo.svg'
        name='Кирилл Приколов'
        description='Любит пограмировать'
        onDonate={handleDonate}
    />
    </div>
    </div>
)
};
export default MainCarousel;