import React from 'react';
import HeroSection from './HeroSec';
import Header from "..//../components/Header"
import Footer from '../Footer';
import UserCard from '../UserCard/UserCard';
import MainCarousel from './MainCarousel';
import './MainPage.css';


const MainPage: React.FC = () => {
  function handleDonate(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
        <HeroSection/>
        <MainCarousel/>
    <Footer/>
    </div>
)};

export default MainPage;
