import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../images/logo.svg';



function Login() {

    const { 
        register,
        formState: {errors},
        handleSubmit,
        reset,
       } = useForm({
           mode: "onChange"
       });

    const emailInputClassName = `form__input input ${errors.email ? 'input_invalid' : ''}`;
    const passwordInputClassName = `form__input input ${errors.password ? 'input_invalid' : ''}`;

    const onSubmit = (data) => {
        console.log((JSON.stringify(data)));
        reset();
    }

     
      
    return (
        <section className='form-section'>
            <div className='form-section__wrap'>
                <a href='/' className='logo'>
                    <img src={logo} alt='Логотип проекта' />
                </a>
                <h1 className='form-section__header'>Рады видеть!</h1>            
                <form className='form' method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className='form__input'>
                    <label className='form__input-label'>E-mail
                        <input className={emailInputClassName} placeholder='Электронная почта' type='email'
                        {...register("email", {
                        required: "Нужно заполнить!", 
                        pattern: { 
                            value: /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
                            message: "Введите адрес электронной почты"
                        }           
                        })} 
                        ></input>
                    </label>
                    <span className='form__input-error-message'>{errors.email && <p>{errors.email.message || "Ошибка"}</p>}</span>        
                </div>
                <div className='form__input'>
                    <label className='form__input-label'>Пароль
                        <input className={passwordInputClassName} placeholder='Введите пароль' type='password'
                        {...register("password", {
                        required: "Нужно заполнить!", 
                        minLength: { 
                            value: 6,
                            message: "Пароль должен быть не менее 6 символов"
                        },                
                        })} 
                        ></input>
                    </label>
                    <span className='form__input-error-message'>{errors.password && <p>{errors.password.message || "Ошибка"}</p>}</span>        
                </div>
                <button className='form__submit-button' type='submit'>Войти</button>               
            </form>
            </div>
            <div className='form-section__link-wrap'>
                <span className='form-section__link-text'>Ещё не зарегистрированы?</span> 
                <a href='/signup' className='form-section__link link'>Регистрация</a>
            </div>
        </section>
    );
}

export default Login;