import React from 'react';



function Navigation({onBurgerMenu}) {

    const navBurgerClassName = `navigation ${onBurgerMenu ? 'navigation_burger' : ''}`;
    const navItemBurgerClassName = `${onBurgerMenu ? 'navigation__item' : 'navigation__item_burger'}`;
     
      
    return (
        <nav className={navBurgerClassName}>
            <ul className='navigation__links'>
                <li className={navItemBurgerClassName}><a href='ya.ru' className='link'>Главная</a></li>
                <li className='navigation__item'><a href='ya.ru' className='link'>Фильмы</a></li>
                <li className='navigation__item'><a href='ya.ru'className='link'>Сохранённые фильмы</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;