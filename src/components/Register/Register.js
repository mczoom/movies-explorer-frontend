import React from 'react';
import logo from '../../images/logo.svg';
import Input from '../Input/Input'



function Register() {
     
      
    return (
        <section className='form-section'>
            <div className='form-section__wrap'>
                <a href='ya.ru' className='logo'>
                    <img src={logo}></img>
                </a>
                <h1 className='form-section__header'>Добро пожаловать!</h1>            
            <form className='form' method="post" noValidate>
                <Input inputName={'Имя'}/>
                <Input inputName={'E-mail'}/>
                <Input inputName={'Пароль'}/>
                <button className='form__submit-button'>Зарегистрироваться</button>               
            </form>
            </div>
            
            <div className='form-section__link-wrap'>
                <span className='form-section__link-text'>Уже зарегистрированы?</span> 
                <a href='ya.ru' className='form-section__link link'>Войти</a>
            </div>
        </section>
    );
}

export default Register;