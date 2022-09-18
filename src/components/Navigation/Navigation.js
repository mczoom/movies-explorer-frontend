import React from 'react';
import { NavLink } from 'react-router-dom';



function Navigation({onBurgerMenu}) {

    const navBurgerClassName = `navigation ${onBurgerMenu ? 'navigation_burger' : ''}`;
    const navLinkBurgerClassName = `${onBurgerMenu ? 'navigation__link' : 'navigation__link_hidden'}`;
     
      
    return (
        <nav className={navBurgerClassName}>
            <div className='navigation__links'>
                <NavLink exact to="/" activeClassName='navigation__link-active' className={navLinkBurgerClassName}>Главная</NavLink>
                <NavLink to="/movies" activeClassName='navigation__link-active' className='navigation__link'>Фильмы</NavLink>
                <NavLink to="/saved-movies" activeClassName='navigation__link-active' className='navigation__link'>Сохранённые фильмы</NavLink>
            </div>
        </nav>
    );
}

export default Navigation;