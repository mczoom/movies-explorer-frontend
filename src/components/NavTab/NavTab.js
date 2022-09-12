import React from 'react';

function NavTab() {
     
      
    return (
        <nav className='navTab'>
          <ul className='navTab__list list'>
            <li className='list__item'><a href='#about-project' className='link_decoration_underline'>О проекте</a></li>
            <li className='list__item'><a href='#techs' className='link_decoration_underline'>Технологии</a></li>
            <li className='list__item'><a href='#about-me' className='link_decoration_underline'>Студент</a></li>
          </ul>
        </nav>
    );
}

export default NavTab;