import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css'
import { hasSubscribers } from "diagnostics_channel";


import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background: linear-gradient(45deg, #000000da, #000000);
  color: #fff;
  padding: 60px 20px 30px;
  font-family: 'Arial', sans-serif;
  border-top: 2px solid #cc8b36;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 0 20px;

  h4 {
    font-size: 1.25rem;
    color: #faa940;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, #cc8b36 0%, #faa940 100%);
    }
  }

  p, a {
    color: rgba(255,255,255,0.8);
    line-height: 1.8;
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    position: relative;

    &:hover {
      color: #faa940;
      &::after {
        width: 100%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: #faa940;
      transition: width 0.3s ease;
    }
  }
`;

export const NewsletterForm = styled.div`
  max-width: 300px;

  input {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 15px;
    background: rgba(255,255,255,0.1);
    border: 1px solid #cc8b36;
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;

    &::placeholder {
      color: rgba(255,255,255,0.6);
    }
    &:invalid {
      border-color: #ff4444;
      box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2);
    }

    &:focus {
      outline: none;
      border-color: #faa940;
      box-shadow: 0 0 0 3px rgba(250,169,64,0.2);
    }
  }

  button {
    width: 100%;
    padding: 12px 20px;
    background: linear-gradient(135deg, #cc8b36, #faa940);
    color: #000;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(250,169,64,0.3);
    }
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid rgba(204,139,54,0.3);
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;

  a {
    color: #faa940;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #cc8b36;
      text-decoration: underline;
    }
  }
`;

const Footer:React.FC  = () => {
    const [subMessage, setSubMessage] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubscribe = () => {
        if (!subMessage.trim()) {
            alert('Пожалуйста, введите email');
            return;
        }
        
        if (!emailRegex.test(subMessage)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }

        alert(`${subMessage}, спасибо что подписались на наши новости!`);
        setSubMessage('');
    };

    return(
        <FooterWrapper> 
        <FooterContainer>
          <FooterSection>
            <h4>Контакты</h4>
            <p>Индекс: 460001</p>
            <p>Оренбург, Оренбургская обл.</p>
            <p>Центральный район,</p>
            <p>улица Чкалова, здание 11</p>
            <p>Рабочий телефон: 79328511898</p>
            <p>Мобильный номер: 79000000000</p>
            </FooterSection>

      

            <FooterSection>
            <h4>Ссылки</h4>
            <ul>
                <li><a href="#">Заглушка 1</a></li>
                <li><a href="#">Заглушка 2</a></li>
                <li><a href="#">Заглушка 3</a></li> 
            </ul>
            </FooterSection>
            <FooterSection>
            <NewsletterForm>
                <h4>Подписка на новости</h4>
                <input 
                    type="email" 
                    placeholder="Введите ваш email"
                    value={subMessage}
                    onChange={(e) => setSubMessage(e.target.value)}
                />
                <button onClick={handleSubscribe}>Подписаться</button>
            </NewsletterForm>
        </FooterSection>
      </FooterContainer>

      <FooterBottom>
        <p>Разработал Кирик и Классная Виолетта</p>
      </FooterBottom>
    </FooterWrapper>  
  );
};

export default Footer;