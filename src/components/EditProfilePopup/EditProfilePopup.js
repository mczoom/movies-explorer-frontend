import React from 'react';
import { useForm } from 'react-hook-form';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';


function EditProfilePopup({isEditProfilePopupOpen, onClose, onUpdate}) {

    const currentUser = React.useContext(CurrentUserContext);

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        getValues,
        watch,
        reset,
       } = useForm({
        mode: 'onChange',
           defaultValues: {
            userName: currentUser.name,
            email: currentUser.email
          }
       });

       const newName = watch('userName');
       const newEmail = watch('email');

       const name = getValues('userName');
       const email = getValues('email');

       function isInfoChanged() {
         return newName === currentUser.name && newEmail === currentUser.email
    };

       const nameInputClassName = `form__input input ${errors.userName ? 'input_invalid' : ''}`;
       const emailInputClassName = `form__input input ${errors.email ? 'input_invalid' : ''}`;
       const popupClassName = `form-section ${isEditProfilePopupOpen ? 'popup' : 'popup_hidden'}`;


       function closePopup(e) {
         if(e.currentTarget === e.target){
           onClose();
           reset();
         }
       }

       function onSubmit() {
         onUpdate(name, email);
         closePopup();
       }



    return (
        <section className={popupClassName} onClick={closePopup}>
            <div className='form-section__wrap popup__container'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='form__input'>
                    <label className='form__input-label'>Имя
                        <input className={nameInputClassName} placeholder={currentUser.name} type='text'
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
                        <input className={emailInputClassName} placeholder={currentUser.email} type='email'
                        {...register("email", {
                        required: "Необходимо заполнить",
                        pattern: {
                            value: /^[_a-z0-9-+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
                            message: "Введите адрес электронной почты"
                        }
                        })}
                        ></input>
                    </label>
                    <span className='form__input-error-message'>{errors.email && <p>{errors.email.message || "Ошибка"}</p>}</span>
                </div>

                <div className='form__submitButton-wrap'>
                <span className='form__reg-error-message'>{isInfoChanged() ? 'Введите новые данные' : ''}</span>
                <button className='form__submit-button' type='submit' disabled={isInfoChanged() || !isValid}>Сохранить</button>
                <button className='form__submit-button cancel-button' type='button' onClick={closePopup}>Отмена</button>
                </div>
            </form>
            </div>
        </section>
    );
}

export default EditProfilePopup;