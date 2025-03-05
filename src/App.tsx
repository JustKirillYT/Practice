// App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import AuthModal from "./components/Auth/AuthModal";
import UserProfile from "./pages/User/UserProfile";
import MainPage from "./components/Main/MainPage";
import Register from "./pages/Sign/Register";
import "./App.css";
import "./styles/BorderBar.css";
import MainCarousel from "./components/Main/MainCarousel";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<{ login: string; avatarUrl: string } | null>(
    () => {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
  );

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user"); // Получаем сохраненного пользователя
  
    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const userData = {
          login: response.data.login || JSON.parse(savedUser || "{}").login, // Берем login из ответа, иначе из localStorage
          avatarUrl: response.data.avatarUrl || JSON.parse(savedUser || "{}").avatarUrl, // Берем avatarUrl из ответа, иначе из localStorage
        };
  
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем пользователя
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } else if (savedUser) {
      // Если токена нет, но есть сохраненные данные - используем их
      setUser(JSON.parse(savedUser));
    }
  };
  

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = (userData: { login: string; avatarUrl: string }) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем пользователя
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Удаляем сохраненного пользователя
    setUser(null);
  };

  return (
    <BrowserRouter>
    <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
      <Header
        onOpenAuthModal={() => setIsModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles/:userId" element={<UserProfile />} />
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
