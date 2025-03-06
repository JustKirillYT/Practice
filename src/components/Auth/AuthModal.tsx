import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Импортируем ReactDOM для Portal
import styles from '../../styles/Auth/AuthModal.module.css';
import { loginUser, registerUser } from '../../api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { id: number; login: string; avatarUrl: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // Состояние для аватарки

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Пароль должен содержать хотя бы одну заглавную букву';
    }
    if (!/[a-z]/.test(password)) {
      return 'Пароль должен содержать хотя бы одну строчную букву';
    }
    return null;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.mdPerspective);
      // Загружаем аватарку из localStorage при открытии модального окна
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.avatarUrl) {
        setAvatarUrl(user.avatarUrl);
      }
    } else {
      document.body.classList.remove(styles.mdPerspective);
      setFormData({ login: '', password: '' });
      setError(null);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    try {
      let response;
      if (isLogin) {
        response = await loginUser(formData);
      } else {
        response = await registerUser(formData);
      }

      // Сохраняем данные пользователя в localStorage
      const userData = {
        id: response.user.id,
        login: response.user.login,
        avatarUrl: response.user.avatarUrl || 'https://avatars.mds.yandex.net/i?id=373b48b71c8b3fa6d7d5f9c5dbdf5457_sr-4826347-images-thumbs&n=13',
        token: response.token,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Обновляем состояние аватарки
      setAvatarUrl(userData.avatarUrl);

      // Передаем данные пользователя в родительский компонент
      onLogin({
        id: userData.id,
        login: userData.login,
        avatarUrl: userData.avatarUrl,
      });

      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  if (!isOpen) return null;

  // Используем React Portal для рендеринга модального окна
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.mdModal} ${isOpen ? styles.mdShow : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        {/* Отображаем аватарку, если она есть */}
        {avatarUrl && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src={avatarUrl}
              alt="Аватар"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
        )}

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ padding: '0 25px' }}>
          <div className={styles.formGroup}>
            <label>Логин:</label>
            <input
              type="text"
              name="login"
              value={formData.login}
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
    </>,
    document.body // Рендерим модальное окно в body
  );
};

export default AuthModal;