import React from 'react';
import HeroSection from './HeroSec';
import Header from "..//../components/Header"
import MainCarousel from './MainCarousel';

const MainPage: React.FC = () => {
  return (
    <div>
        <Header/>
        <HeroSection/>
        <MainCarousel/>
    </div>
)};

export default MainPage;
