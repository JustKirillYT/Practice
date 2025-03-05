import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfileByUserId, updateProfile } from '../../api'; // Импортируем новые методы API
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>(); // Получаем userId из URL
  const [profile, setProfile] = useState<any>(null); // Состояние для хранения профиля
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
  const [formData, setFormData] = useState<any>(null); // Состояние для данных формы
  
  // Извлекаем ID текущего пользователя из localStorage
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id || localStorage.getItem('userId');
  
  const navigate = useNavigate(); // Хук для перенаправления

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const profileData = await getProfileByUserId(Number(userId)); // Запрашиваем профиль по userId
          setProfile(profileData);
          setFormData(profileData); // Инициализируем форму данными профиля
          setLoading(false); // Загружено
        } catch (error) {
          console.error('Ошибка при загрузке профиля:', error);
          setLoading(false); // Завершаем загрузку даже в случае ошибки
        }
      };

      fetchProfile();
    }
  }, [userId]);

  // Обработка изменений в форме
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Сохранение изменений
  const handleSave = async () => {
    try {
      await updateProfile(formData); // Отправляем обновленные данные на сервер
      setProfile(formData); // Обновляем профиль в состоянии
      setIsEditing(false); // Выход из режима редактирования
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>; // Показываем загрузку, пока данные не получены
  }

  if (!profile) {
    return <div>Профиль не найден</div>; // Если профиль не найден
  }

  const { avatar, background, name, description, balance } = profile;
  const canEdit = currentUserId === Number(userId); // Проверяем, может ли редактировать

  return (
    <div className="profile-container">
      <h1>Профиль: {name}</h1>

      {/* Загрузка аватарки */}
      <img src={avatar} alt="Avatar" className="profile-avatar" />

      {/* Фон и информация о пользователе */}
      <div className="profile-background" style={{ backgroundImage: `url(${background})` }}>
        <div className="profile-info">
          {isEditing ? (
            // Форма редактирования
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea-field"
              />
            </div>
          ) : (
            <div>
              <h2 className="profile-name">{name}</h2>
              <p className="profile-description">{description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Блок баланса */}
      <div className="balance-block">
        <h3 className="balance-title">Ваш баланс</h3>
        <p className="balance-amount">{balance} ₽</p>
      </div>

      {/* Условие для отображения кнопки редактирования */}
      {canEdit && (
        <div>
          {isEditing ? (
            <button className="save-button" onClick={handleSave}>Сохранить</button>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>Редактировать</button>
          )}
        </div>
      )}

      {!canEdit && (
        <div className="donate-section">
          <button className="donate-button">Пожертвовать</button>
          <input type="number" placeholder="Сумма пожертвования" className="donate-input" />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
