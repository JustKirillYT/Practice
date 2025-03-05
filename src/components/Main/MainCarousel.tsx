import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from 'styled-components';

interface UserProfile {
  id: number;
  avatar: string;
  name: string;
  purpose: string;
  userid: number;
}

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 20px 0;
  background: transparent;
`;

const UserCard = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #cc8b36;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 320px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);

  &:hover {
    border-color: #faa940;
    box-shadow: 0 16px 16px rgba(250, 169, 64, 0.3);

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(204, 139, 54, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
`;

const Avatar = styled.div<{ $src: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(${props => props.$src}) center/cover;
  border: 3px solid #cc8b36;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  ${UserCard}:hover & {
    transform: scale(1.05);
    border-color: #faa940;
  }
`;

const Name = styled.h3`
  color: #faa940;
  font-size: 1.4rem;
  margin: 0 0 0.8rem;
  text-align: center;
  position: relative;
  z-index: 2;
  font-weight: 500;
  letter-spacing: 0.5px;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #cc8b36 0%, #faa940 100%);
    margin: 0.8rem auto 0;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  ${UserCard}:hover &::after {
    width: 60px;
  }
`;

const Purpose = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  text-align: center;
  flex-grow: 1;
  line-height: 1.6;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #2A5C8D, #1E456E);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #1E456E, #2A5C8D);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    &.prev { left: 10px; }
    &.next { right: 10px; }
  }
`;

const MainCarousel: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserProfile[]>('http://localhost:3000/api/profiles/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={'auto'}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {users.map((user) => (
          <SwiperSlide key={user.id}>
            <UserCard onClick={() => navigate(`/profiles/${user.userid}`)}>
              <Avatar $src={user.avatar || '/default-avatar.png'} />
              <Name>{user.name}</Name>
              <Purpose>{user.purpose}</Purpose>
            </UserCard>
          </SwiperSlide>
        ))}
      </Swiper>

      <NavButton className="prev">‹</NavButton>
      <NavButton className="next">›</NavButton>
    </Container>
  );
};

export default MainCarousel;