import React from 'react';
import HeroSection from './HeroSec';
import Header from "..//../components/Header"
import Carousel from './MainCarousel';
import Footer from '../Footer';
import UserCard from '../UserCard/UserCard';


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const MainPage: React.FC = () => {
  function handleDonate(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
        <Header/>
        <HeroSection/>
        <Carousel
    swipeable={false}
    draggable={false}
    showDots={true}
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={3000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
<UserCard
    avatar='..//../logo.svg'
    name='Кирилл Приколов'
    description='Любит пограмировать'
    onDonate={handleDonate}/>

<UserCard
    avatar='..//../logo.svg'
    name='Набоков'
    description='Боков'
    onDonate={handleDonate}/>

<UserCard
    avatar='..//../logo.svg'
    name='Рулон Обоев'
    description='Сальтушник'
    onDonate={handleDonate}/>

<UserCard
    avatar='..//../logo.svg'
    name='Долбаёб иваныч'
    description='Говножуй'
    onDonate={handleDonate}/>

</Carousel>
    <Footer/>
    </div>
)};

export default MainPage;
