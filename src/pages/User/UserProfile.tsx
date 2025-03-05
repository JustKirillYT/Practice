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
  
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id || localStorage.getItem('userId');
  
  interface Profile {
    id: number;
    name: string;
    purpose: string;
    avatar: string;
    background: string;
    balance: number;
  }
  
  const UserProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Profile>>({});
    
    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id || localStorage.getItem('userId');
    
    const navigate = useNavigate(); 
  
    useEffect(() => {
      if (userId) {
        const fetchProfile = async () => {
          try {
            const profileData = await getProfileByUserId(Number(userId));
            setProfile(profileData);
            setFormData(profileData);
            setLoading(false);
          } catch (error) {
            console.error('Ошибка при загрузке профиля:', error);
            setLoading(false);
          }
        };
  
        fetchProfile();
      }
    }, [userId]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSave = async () => {
      try {
        await updateProfile(formData, Number(userId));
        setProfile(formData as Profile);
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
      }
    };
  
    if (loading) {
      return <div>Загрузка...</div>;
    }
  
    if (!profile) {
      return <div>Профиль не найден</div>;
    }
  
    const { avatar, background, name, purpose, balance } = profile;
    const canEdit = currentUserId === Number(userId);
  
    return (
      <div className="profile-container">
        <h1>Профиль: {name}</h1>
        <img src={avatar} alt="Avatar" className="profile-avatar" />
        <div className="profile-background" style={{ backgroundImage: `url(${background})` }}>
          <div className="profile-info">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="input-field"
                />
                <textarea
                  name="purpose"
                  value={formData.purpose || ''}
                  onChange={handleChange}
                  className="textarea-field"
                />
              </div>
            ) : (
              <div>
                <h2 className="profile-name">{name}</h2>
                <p className="profile-purpose">{purpose}</p>
              </div>
            )}
          </div>
        </div>
  
        {canEdit && (
          <div className="balance-block">
            <h3 className="balance-title">Ваш баланс</h3>
            <p className="balance-amount">{balance} ₽</p>
          </div>
        )}
  
        {canEdit && (
          <div>
            {isEditing ? (
              <>
                <button className="save-button" onClick={handleSave}>Сохранить</button>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>Отмена</button>
              </>
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
}
  export default UserProfile;