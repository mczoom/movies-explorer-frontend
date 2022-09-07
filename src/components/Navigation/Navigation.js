import React from 'react';



function Navigation() {
     
      
    return (
        <nav className='navigation'>
            <ul className='navigation__links'>
                <li className='navigation__item'><a href='ya.ru' className='link'>Фильмы</a></li>
                <li className='navigation__item'><a href='ya.ru'className='link'>Сохранённые фильмы</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;