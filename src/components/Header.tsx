import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

interface HeaderProps {
  onOpenAuthModal: () => void;
  user: {
    login: string;
    avatarUrl: string;
  } | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAuthModal, user, onLogout }) => {
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
      <div>
        {user ? (
          <div className="user-info">
            <Link to="/UserProfile">
              <img src={user.avatarUrl} alt="Avatar" className="avatar" />
              <span>{user.login}</span>
            </Link>
            {onLogout && (
              <button className="button" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        ) : (
          <button className="button" onClick={onOpenAuthModal}>
            SignIn
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;