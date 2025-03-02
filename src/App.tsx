import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const handleLogin = (userData: { login: string; avatarUrl: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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