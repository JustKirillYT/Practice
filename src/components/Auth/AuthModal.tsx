import React, { useState, useEffect } from 'react';
import styles from '../../styles/Auth/AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.mdPerspective);
    } else {
      document.body.classList.remove(styles.mdPerspective);
      // Сброс формы при закрытии
      setFormData({ name: '', email: '', password: '' });
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Вход:', formData.email, formData.password);
    } else {
      console.log('Регистрация:', formData.name, formData.email, formData.password);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`${styles.mdModal} ${isOpen ? styles.mdShow : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        <form onSubmit={handleSubmit} style={{ padding: '0 25px' }}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label>Имя:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </form>
      </div>

      <div className={`${styles.mdOverlay} ${isOpen ? styles.mdShow : ''}`} onClick={onClose} />
    </>
  );
};

export default AuthModal;