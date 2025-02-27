import React from 'react';
import HeroSection from './HeroSec';
import Header from "..//../components/Header"
import Carousel from './MainCarousel';
import Footer from '../Footer';
import UserCard from '../UserCard/UserCard';
import UsersList from '../Auth/UsersList';


const MainPage: React.FC = () => {
  function handleDonate(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
        <HeroSection/>
        <UsersList/>
    <Footer/>
    </div>
)};

export default MainPage;
