import React from 'react';


function BurgerMenu({onBurgerMenu, openBurgerMenu, closeBurgerMenu}) {

    const burgerMenuClassName = `burger-menu ${onBurgerMenu ? 'burger-menu_on' : ''}`;
    

    return ( 
        <div>       
            <div className={burgerMenuClassName}>
                <div className='burger-menu__container'>
                    <button className='burger-menu__close-button' onClick={closeBurgerMenu} type='button'></button>                    
                </div>                
            </div>
            <button className='burger-menu-btn' onClick={openBurgerMenu} type='button'></button>
        </div>    
    );
}

export default BurgerMenu;