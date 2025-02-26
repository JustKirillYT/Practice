import React, { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UserCard from "../UserCard/UserCard"
import '..//../styles/MainCarousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


<Carousel responsive={responsive}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;

const handleDonate = () => {
    alert('Спасибо за пожертвование!');
  };

const MainCarousel = ({}) => {
  return (
    <div className='background'>
    <h1 className="h1">Случайные пользователи и их сборы</h1>
    <div className='carousel UserCards'>
<UserCard
    avatar='..//../logo.svg'
    name='Кирилл Приколов'
    description='Любит пограмировать'
    onDonate={handleDonate}/>
    <div>Лоло</div>
</div>
</div>  
   
)
};
export default Carousel;  