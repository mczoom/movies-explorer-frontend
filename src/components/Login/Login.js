import React from 'react';
import logo from '../../images/logo.svg';
import Input from '../Input/Input'



function Login() {
     
      
    return (
        <section className='form-section'>
            <div className='form-section__wrap'>
                <a href='ya.ru' className='logo'>
                    <img src={logo}></img>
                </a>
                <h1 className='form-section__header'>Рады видеть!</h1>            
                <form className='form' method="post" noValidate>
                <Input inputName={'E-mail'}/>
                <Input inputName={'Пароль'}/>
                <button className='form__submit-button'>Войти</button>               
            </form>
            </div>
            <div className='form-section__link-wrap'>
                <span className='form-section__link-text'>Ещё не зарегистрированы?</span> 
                <a href='ya.ru' className='form-section__link link'>Регистрация</a>
            </div>
        </section>
    );
}

export default Login;