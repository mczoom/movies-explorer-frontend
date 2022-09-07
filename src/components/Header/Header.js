import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
     
      
    return (
        <header className='header'>
            <img src={logo} className='header__logo' alt='Логотип проекта'/>
            <Navigation />
            <div className='auth-buttons auth-buttons_hidden'>
                <a href='ya.ru' className='auth-buttons__signup-button link'>Регистрация</a>                
                <a href='ya.ru' className='auth-buttons__login-button link'>Войти</a>
            </div>
            <div className='header__account'>
                <span className='account__name'>Аккаунт</span>
                <button className='account__icon'></button>
            </div>
            <button className='burger-menu'></button>
        </header>
    );
}

export default Header;