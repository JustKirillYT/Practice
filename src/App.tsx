import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Подключаем Header
import AuthModal from "./components/Auth/AuthModal"; // Подключаем модальное окно
import UserProfile from "./pages/User/UserProfile";
import MainPage from "./components/Main/MainPage";
import Register from "./pages/Sign/Register";
import './App.css';
import './styles/BorderBar.css';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Header отображается на всех страницах */}
      <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />

      {/* Основные маршруты */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </BrowserRouter>
  );
};

export default App;