import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../Footer';
import HeroSection from './HeroSec';
import MainCarousel from './MainCarousel';

const PageWrapper = styled.div`
  overflow-x: visible;
`;

// Отдельный контейнер для HeroSection
const HeroContainer = styled.section`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: linear-gradient(45deg, #000000da, #000000);
  padding: 80px 0;
`;

// Основной контент-контейнер
const ContentContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Контейнер для карусели
const CarouselContainer = styled.section`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 60px 0;
  background: rgba(0, 0, 0, 0.95);
`;

const MainPage: React.FC = () => {
  return (
    <PageWrapper>
      {/* HeroSection как отдельная секция */}
      <HeroContainer>
        <ContentContainer>
          <HeroSection />
        </ContentContainer>
      </HeroContainer>

      {/* Карусель как отдельная секция */}
      <CarouselContainer>
        <ContentContainer>
          <MainCarousel />
        </ContentContainer>
      </CarouselContainer>
    </PageWrapper>
  );
};

export default MainPage;