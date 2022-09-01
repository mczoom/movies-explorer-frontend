import React from 'react';
import logo from '../../images/logo.svg';

function Header() {
     
      
    return (
        <div className='header'>
            <img src={logo} className='header__logo' alt='Логотип проекта'/>
            <div className='header__auth auth'>
                <a href='ya.ru' className='auth__signup-button'>Регистрация</a>
                
                <a href='ya.ru' className='auth__login-button'>Войти</a>
            </div>

        </div>
    );
}

export default Header;