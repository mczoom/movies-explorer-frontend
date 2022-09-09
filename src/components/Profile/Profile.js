import React from 'react';
import Header from '../Header/Header';


function Profile() {
     
    const userName = 'Андрей';
      
    return (
        <div className='profile'>
          <Header />
          <div className='profile__container'>
            <h1 className='profile__header'>Привет, {userName}!</h1>
            <div className='profile__profile-info'>
                <div className='profile-info__field'>
                    <span className='profile-info__header'>Имя</span>
                    <span className='profile-info__value'>{userName}</span>
                </div>
                <div className='profile-info__divider'></div>
                <div className='profile-info__field'>
                    <span className='profile-info__header'>E-mail</span>
                    <span className='profile-info__value'>pochta@yandex.ru</span>
                </div>
            </div>
            <button className='profile__edit-button'>Редактировать</button>
            <button className='profile__logout_button'>Выйти из аккаунта</button>
          </div>
        </div>
    );
}

export default Profile;