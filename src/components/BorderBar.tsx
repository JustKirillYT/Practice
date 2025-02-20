import React, { useState } from 'react';
import '../styles/BorderBar.css';
import { Link } from 'react-router-dom';

interface SliderProps {
    children: React.ReactNode;
  }

  const Slider: React.FC<SliderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleSlider = () => {
      setIsOpen(!isOpen);
    };

    return (
    <div className={`slider-container ${isOpen ? '' : 'hidden'}`}>
      <div className="slider">
        <button className="toggle-button" onClick={toggleSlider}>
          {isOpen ? 'Hide' : 'Show'}
        </button>
        {children}
      </div>
      <div className="content">
      <ul>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="UserProfile">Профиль</Link></li>
      </ul>
      </div>
    </div>
  );
};

export default Slider;
