import React from "react";
import './App.css';
import Header from './components/Header';
import BorderBar from './components/BorderBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <BorderBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
      
    </BrowserRouter>
  );
}
export default App;