import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
// import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header() {

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

    const burgerMenuClassName = `burger-menu ${isBurgerMenuOpen ? 'burger-menu_on' : ''}`;
    const accountClassName = `header__account ${isBurgerMenuOpen ? 'header__account_burger' : ''}`;

    function openBurgerMenu() {
        setIsBurgerMenuOpen(true);
    }

    function closeBurgerMenu() {
        setIsBurgerMenuOpen(false);
    }
     
      
    return (
        <header className='header'>
            
            <img src={logo} className='header__logo' alt='Логотип проекта'/>
            <div className={burgerMenuClassName}>
                <div className='burger-menu__container'>
                    <button className='burger-menu__close-button' onClick={closeBurgerMenu}></button>                    
                </div>                
            </div>
            <button className='burger-menu-btn' onClick={openBurgerMenu}></button>
            <Navigation onBurgerMenu={isBurgerMenuOpen}/>            
            <div className='auth-buttons auth-buttons_hidden'>
                <a href='ya.ru' className='auth-buttons__signup-button link'>Регистрация</a>                
                <a href='ya.ru' className='auth-buttons__login-button link'>Войти</a>
            </div>
            <div className={accountClassName}>
                <span className='account__name'>Аккаунт</span>
                <button className='account__icon'></button>
            </div>
            
            
        </header>
    );
}

export default Header;