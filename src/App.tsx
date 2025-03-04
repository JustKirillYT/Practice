import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header"; // Подключаем Header
import AuthModal from "./components/Auth/AuthModal"; // Подключаем модальное окно
import UserProfile from "./pages/User/UserProfile";
import MainPage from "./components/Main/MainPage";
import Register from "./pages/Sign/Register";
import './App.css';
import './styles/BorderBar.css';
import MainCarousel from "./components/Main/MainCarousel";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<{ login: string; avatarUrl: string } | null>(null);

  // Функция для проверки токена и загрузки данных пользователя
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Отправляем запрос на бекенд для проверки токена и получения данных пользователя
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Обновляем состояние пользователя
        setUser({
          login: response.data.login,
          avatarUrl: response.data.avatarUrl || "https://avatars.mds.yandex.net/i?id=373b48b71c8b3fa6d7d5f9c5dbdf5457_sr-4826347-images-thumbs&n=13", // Заглушка для аватара
        });
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        localStorage.removeItem("token"); // Удаляем невалидный токен
      }
    }
  };

  // Проверяем токен при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = (userData: { login: string; avatarUrl: string }) => {
    setUser(userData); // Сохраняем данные пользователя
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    setUser(null); // Сбрасываем данные пользователя
  };

  return (
    <BrowserRouter>
      <Header
        onOpenAuthModal={() => setIsModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
    </BrowserRouter>
  );
};

export default App;