import React from "react";
import './App.css';
import './styles/BorderBar.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/User/UserProfile";
import MainPage from "./components/Main/MainPage";
import Register from './pages/Sign/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;