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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = currentUser.id || localStorage.getItem('userId');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="header-content">
        <div className="logo-container">
          <Link to="/" className="logo">
            ShareYH
          </Link>
        </div>
  
        <div className="nav-right">
          {user ? (
            <div className="user-menu">
              <div 
                className="user-profile"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img 
                  src={user.avatarUrl || '/default-avatar.png'} 
                  alt="Avatar" 
                  className="user-avatar"
                />
                <span className="username">{user.login}</span>
              </div>

              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link 
                    to={`/profiles/${currentUserId}`} 
                    className="menu-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Мой профиль
                  </Link>
                  {onLogout && (
                    <button 
                      className="menu-item logout-button"
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Выйти
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button 
              className="auth-button"
              onClick={onOpenAuthModal}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;