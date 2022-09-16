import React from 'react';

function NavTab() {
     
      
    return (
        <nav className='nav-tab'>
          <ul className='nav-tab__list'>
            <li className='nav-tab__item'><a href='#about-project' className='link_decoration_underline'>О проекте</a></li>
            <li className='nav-tab__item'><a href='#techs' className='link_decoration_underline'>Технологии</a></li>
            <li className='nav-tab__item'><a href='#about-me' className='link_decoration_underline'>Студент</a></li>
          </ul>
        </nav>
    );
}

export default NavTab;