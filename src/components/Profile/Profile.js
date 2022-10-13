import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';


function Profile({onLogout, onEdit, isEditProfilePopupOpen, onClose, onUpdate, updateUserInfoResponse, profileError}) {
     
    const currentUser = React.useContext(CurrentUserContext);

    const [currentUserName, setCurrentUserName] = React.useState(currentUser.name);
    const [currentUserEmail, setCurrentUserEmail] = React.useState(currentUser.email);
    
    
    React.useEffect(() => {
        setCurrentUserName(currentUser.name);
        setCurrentUserEmail(currentUser.email);
      }, []);

          
    return (
        <div className='profile'>
          <Header />
          <div className='profile__container'>
            <h1 className='profile__header'>Привет, {currentUser.name}!</h1>
            <form className='profile__profile-info'>
                <div className='profile-info__field'>
                    <span className='profile-info__header'>Имя</span>
                    <span className='profile-info__value' >{currentUser.name}</span>
                </div>
                <div className='profile-info__divider'></div>
                <div className='profile-info__field'>
                    <span className='profile-info__header'>E-mail</span>
                    <span className='profile-info__value'>{currentUser.email}</span>
                </div>
                <span className='profile__edit-message'>{updateUserInfoResponse}</span>
            </form>
            <div className='form__submitButton-wrap'>
                <span className='profile__error-message'>{profileError}</span>
                <button className='profile__edit-button link' type='button' onClick={onEdit}>Редактировать</button>
            </div>
            <button className='profile__logout_button link' type='button' onClick={onLogout}>Выйти из аккаунта</button>                
          </div>
          <EditProfilePopup isEditProfilePopupOpen={isEditProfilePopupOpen} onClose={onClose} currentUserName={currentUserName} currentUserEmail={currentUserEmail} onUpdate={onUpdate} />
        </div>
    );
}

export default Profile;