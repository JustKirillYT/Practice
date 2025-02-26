import React from "react";
import '../styles/Footer.css'

const Footer:React.FC  = () => {
    return(
     <div className="footer"> 
        <div className="footer block">
            <dt className="footer block dt">
                <h1>Контакты:</h1>
                <dd>Мобильный телефон</dd>
                <dd>Рабочий телефон</dd>
                <dd>Почта</dd>
            </dt>
        </div>
        <div className="footer block">
                <dt className="footer block dt">
                    <h1>О нас:</h1>
                    <dd>Мы занимаемся тем-то и тем-то, говорим о том-то и том-то</dd>
                </dt>
        </div>
     </div>  
    );
};

export default Footer;