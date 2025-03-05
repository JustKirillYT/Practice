import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileByUserId, updateProfile } from '../../api';
import './UserProfile.css';

interface Profile {
  id: number;
  name: string;
  purpose: string;
  avatar: string;
  userid: number;
  balance?: number; // Добавляем баланс
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [error, setError] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = currentUser.id || localStorage.getItem('userId');

  useEffect(() => {
    let isMounted = true;
    
    const fetchProfile = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is undefined');
        }
        
        const profileData = await getProfileByUserId(Number(userId));
        if (isMounted) {
          setProfile(profileData);
          setFormData(profileData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Ошибка при загрузке профиля');
          setLoading(false);
          console.error(err);
        }
      }
    };

    if (userId) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!userId) {
        throw new Error('User ID is undefined');
      }

      // Проверяем, что ссылка на аватарку валидна
      if (formData.avatar && !isValidUrl(formData.avatar)) {
        throw new Error('Некорректная ссылка на аватарку');
      }

      const updatedProfile = await updateProfile(formData, Number(userId));
      setProfile(updatedProfile); // Обновляем профиль
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setError('Не удалось сохранить изменения');
    }
  };

  // Функция для проверки валидности URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (loading) {
    return <div className="loading-container">Загрузка профиля...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!profile) {
    return <div className="error-container">Профиль не найден</div>;
  }

  

  const handleDonate = () => {
    if (!donationAmount) {
      alert('Пожалуйста, укажите сумму пожертвования');
      return;
    }
    
    const amount = parseInt(donationAmount);
    if (isNaN(amount)) {
      alert('Некорректная сумма');
      return;
    }

    alert(`Спасибо за пожертвование ${amount} ₽!\nСообщение: ${donationMessage || 'Без сообщения'}`);
    setDonationAmount('');
    setDonationMessage('');
  };

  const { avatar, userid, name, purpose, balance } = profile;
  const canEdit = currentUserId === Number(userId);

  return (
    <div className="profile-container">
      <h1 className="profile-header">{name}</h1>
      
      <div className="avatar-section">
        <img 
          src={avatar || '../../default-avatar.jpg'} 
          alt="Аватар" 
          className="profile-avatar"
        />
        <p className="profile-purpose">{purpose}</p>
        <div className="action-buttons">
          {canEdit ? (
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Отмена' : 'Редактировать'}
            </button>
          ) : (
            <div className="donation-section">
              <div className="donation-inputs">
                <input
                  type="number"
                  placeholder="Сумма"
                  className="donation-amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="1"
                />
                <input
                  type="text"
                  placeholder="Сообщение (необязательно)"
                  className="donation-message"
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                />
              </div>
              <button 
                className="donate-button"
                onClick={handleDonate}
              >
                Поддержать
              </button>
            </div>
          )}
        </div>
      </div>

      {canEdit && (
        <div className="balance-section">
          <h3 className="balance-title">Ваш баланс</h3>
          <p className="balance-amount">{balance || 0} ₽</p>
        </div>
      )}

{isEditing && (
  <div className="edit-form">
    <div className="form-group">
      <label>Имя:</label>
      <input
        type="text"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label>Цель:</label>
      <textarea
        name="purpose"
        value={formData.purpose || ''}
        onChange={handleChange}
        className="form-textarea"
        rows={4}
      />
    </div>

    <div className="form-group">
      <label>Аватар (URL):</label>
      <input
        type="text"
        name="avatar"
        value={formData.avatar || ''}
        onChange={handleChange}
        className="form-input"
        placeholder="Введите ссылку на изображение"
      />
    </div>

    <button className="save-button" onClick={handleSave}>
      Сохранить
    </button>
  </div>
)}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UserProfile;