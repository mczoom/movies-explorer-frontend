import React from 'react';
import { NavLink } from 'react-router-dom';



function Navigation({onBurgerMenu}) {

    const navBurgerClassName = `navigation ${onBurgerMenu ? 'navigation_burger' : ''}`;
    const navItemBurgerClassName = `${onBurgerMenu ? 'navigation__item' : 'navigation__item_hidden'}`;
     
      
    return (
        <nav className={navBurgerClassName}>
            <div className='navigation__links'>
                <NavLink exact to="/" activeClassName='navigation__item-underline' className={navItemBurgerClassName}>Главная</NavLink>
                <NavLink to="/movies" activeClassName='navigation__item-underline' className='navigation__item'>Фильмы</NavLink>
                <NavLink to="/saved-movies" activeClassName='navigation__item-underline' className='navigation__item'>Сохранённые фильмы</NavLink>
            </div>
        </nav>
    );
}

export default Navigation;