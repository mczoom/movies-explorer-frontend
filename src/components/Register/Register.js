import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../images/logo.svg';




function Register({handleRegistration, registrationResponse}) {

    const { 
         register,
         formState: {errors},
         handleSubmit,
         getValues,         
        } = useForm({
            mode: "onChange"
        });

        
        const name = getValues('userName');
        const email = getValues('email');
        const password = getValues('password');

        
        function onSubmit() {            
            handleRegistration(name, email, password);
        }

        
        const nameInputClassName = `form__input input ${errors.userName ? 'input_invalid' : ''}`;
        const emailInputClassName = `form__input input ${errors.email ? 'input_invalid' : ''}`;
        const passwordInputClassName = `form__input input ${errors.password ? 'input_invalid' : ''}`;
     
      
    return (
        <section className='form-section'>
            <div className='form-section__wrap'>
                <a href='/' className='logo'>
                    <img src={logo} alt='Логотип проекта' />
                </a>
                <h1 className='form-section__header'>Добро пожаловать!</h1>            
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='form__input'>
                    <label className='form__input-label'>Имя
                        <input className={nameInputClassName} placeholder='Ваше имя' type='text'
                        {...register("userName", {
                        required: "Необходимо заполнить", 
                        minLength: { 
                            value: 3,
                            message: "Имя должно быть длинее 2 симоволов"
                        },        
                        })} 
                        ></input>
                    </label>
                    <span className='form__input-error-message'>{errors.userName && <p>{errors.userName.message || "Ошибка"}</p>}</span>        
                </div>
                <div className='form__input'>
                    <label className='form__input-label'>E-mail
                        <input className={emailInputClassName} placeholder='Электронная почта' type='email'
                        {...register("email", {
                        required: "Необходимо заполнить", 
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
                        required: "ведите пароль", 
                        minLength: { 
                            value: 6,
                            message: "Пароль должен быть не менее 6 символов"
                        },                
                        })} 
                        ></input>
                    </label>
                    <span className='form__input-error-message'>{errors.password && <p>{errors.password.message || "Ошибка"}</p>}</span>        
                </div>
                <div className='form__submitButton-wrap'>
                <span className='form__reg-error-message'>{registrationResponse}</span>
                <button className='form__submit-button' type='submit' >Зарегистрироваться</button>                
                </div>
            </form>
            </div>            
            <div className='form-section__link-wrap'>
                <span className='form-section__link-text'>Уже зарегистрированы?</span> 
                <a href='/signin' className='form-section__link link'>Войти</a>
            </div>
        </section>
    );
}

export default Register;