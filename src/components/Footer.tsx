import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css'

const Footer:React.FC  = () => {
    return(
     <div className="footer"> 
       <div className="footer-container">
        <div className="footer-section">
            <h4>Контакты</h4>
            <p>Индекс: 460001</p>
            <p>Оренбург, Оренбургская обл.</p>
            <p>Центральный район,</p>
            <p>улица Чкалова, здание 11</p>
            <p>Рабочий телефон: 79328511898</p>
            <p>Мобильный номер: 79000000000</p>
        </div>
      

        <div className="footer-section">
            <h4>Ссылки</h4>
            <ul>
                <li><a href="#">Заглушка 1</a></li>
                <li><a href="#">Заглушка 2</a></li>
                <li><a href="#">Заглушка 3</a></li>
            </ul>
        </div>
        <div className="footer-section newsletter">
            <h4>Подписка на новости</h4>
            <input type="email" placeholder="Введите почтовый адрес"/>
            <button>Подписаться</button>
        </div>
    </div>
    <div className="footer-bottom">
        <p>Разработал Кирик и Классная Виолетта</p>
    </div>
     </div>  
    );
};

export default Footer;