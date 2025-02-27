import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

interface HeaderProps {
  onOpenAuthModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAuthModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="logo">ShareYourHappiness</div>
      <nav className="nav">
      </nav>
      <div >
        <button className="button"  onClick={onOpenAuthModal}>SingIn</button>
      </div>
    </header>
  );
};

export default Header;
