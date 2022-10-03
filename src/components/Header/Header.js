import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';


function Header() {

    const location = useLocation();

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    const burgerMenuClassName = `burger-menu ${isBurgerMenuOpen ? 'burger-menu_on' : ''}`;
    const accountClassName = `header__account ${isBurgerMenuOpen ? 'header__account_burger' : ''}`;
    const headerClassName = `header ${location.pathname === '/' ? 'header__promo' : ''}`;

    function openBurgerMenu() {
        setIsBurgerMenuOpen(true);
    }

    function closeBurgerMenu() {
        setIsBurgerMenuOpen(false);
    }
     
      
    return (
        <header className={headerClassName}>
            <a href='/' className='header__logo'>
            <img src={logo} alt='Логотип проекта'/>
            </a>
            <div className={burgerMenuClassName}>
                <div className='burger-menu__container'>
                    <button className='burger-menu__close-button' type='button' onClick={closeBurgerMenu}></button>                    
                </div>                
            </div> 
            {isLoggedIn ?           
                (<>                
                    <Navigation onBurgerMenu={isBurgerMenuOpen}/>
                    <a href='/profile' className='link'>
                        <div className={accountClassName}>                
                            <span className='account__name'>Аккаунт</span>
                            <button className='account__icon' type='button'></button>                
                        </div>
                    </a> 
                    <button className='burger-menu-btn' onClick={openBurgerMenu} type='button'></button>
                </>     
                ) : 
                (<div className='auth-buttons'>
                    <a href='/signup' className='auth-buttons__signup-button link'>Регистрация</a>                
                    <a href='/signin' className='auth-buttons__login-button link'>Войти</a>
                </div>)
            }    
        </header>
    );
}

export default Header;