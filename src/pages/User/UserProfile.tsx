import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileByUserId, transferMoney, getBalance, updateProfile } from '../../api';
import './UserProfile.css';

interface Profile {
  id: number;
  name: string;
  purpose: string;
  avatar: string;
  userid: number;
  balance?: number;
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
  const [balance, setBalance] = useState<number | null>(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = Number(currentUser.id) || Number(localStorage.getItem('userId'));
  const canEdit = currentUserId === Number(userId);

  // Загрузка профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is undefined');
        }

        const profileData = await getProfileByUserId(Number(userId));
        setProfile(profileData);
        setFormData(profileData);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке профиля');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  // Загрузка баланса
  const fetchBalance = async () => {
    try {
      if (!userId) return;
      const balance = await getBalance(Number(userId));
      setBalance(balance);
    } catch (error) {
      console.error('Ошибка при загрузке баланса:', error);
    }
  };

  useEffect(() => {
    if (canEdit) {
      fetchBalance();
    }
  }, [userId, canEdit]);

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

      if (formData.avatar && !isValidUrl(formData.avatar)) {
        throw new Error('Некорректная ссылка на аватарку');
      }

      const updatedProfile = await updateProfile(formData, Number(userId));
      setProfile(updatedProfile);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setError('Не удалось сохранить изменения');
    }
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleDonate = async () => {
    if (!donationAmount) {
      alert('Пожалуйста, укажите сумму пожертвования');
      return;
    }

    const amount = parseInt(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Некорректная сумма');
      return;
    }

    if (!userId) {
      alert('Не выбран получатель');
      return;
    }

    try {
      const result = await transferMoney({
        senderId: currentUserId,
        recipientId: Number(userId),
        amount: amount,
        massage: donationMessage,
      });

      console.log('Ответ сервера:', result);

      if (!result || !result.id) {
        throw new Error('Не удалось выполнить перевод: некорректный ответ от сервера');
      }

      alert(`Спасибо за пожертвование ${amount} ₽!`);
      setDonationAmount('');
      setDonationMessage('');

      if (canEdit) {
        await fetchBalance();
      }
    } catch (error) {
      console.error('Ошибка при переводе средств:', error);
      alert(error instanceof Error ? error.message : 'Не удалось выполнить перевод');
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

  const { avatar, name, purpose } = profile;

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
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Отмена' : 'Редактировать'}
              </button>
              {isEditing && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Введите имя"
                    />
                  </div>
                  <div className="form-group">
                    <label>Цель</label>
                    <textarea
                      name="purpose"
                      value={formData.purpose || ''}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="Введите цель"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ссылка на аватар</label>
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar || ''}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Введите ссылку на аватар"
                    />
                  </div>
                  <button className="save-button" onClick={handleSave}>
                    Сохранить
                  </button>
                </div>
              )}
            </>
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

      <div className="balance-section">
        {canEdit && (
          <>
            <h3 className="balance-title">Ваш баланс</h3>
            <p className="balance-amount">{balance !== null ? `${balance} ₽` : 'Загрузка...'}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;