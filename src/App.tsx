import React from "react";
import './App.css';
import './styles/BorderBar.css';
import Header from './components/Header';
import BorderBar from './components/BorderBar';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import {Divider, Title1, Title2} from "./styles/components"

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
      
    </BrowserRouter>

    
  );
}
export default App;