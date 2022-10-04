import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
    const [avatarValidity, setAvatarValidity] = React.useState(true);
    const [avatar, setAvatar] = React.useState('');
    const [avatarError, setAvatarError] = React.useState('');

    function handleAvatarChange(e) {
      setAvatar(e.target.value);
      setAvatarValidity(e.target.validity.valid);
      setAvatarError(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatar);
    }

    React.useEffect(() => {
      setAvatarValidity(true);
      setAvatar('');
      setAvatarError('');
    }, [props.isOpen]);



    return (        
        <PopupWithForm title="Обновить аватар" name="avatar" buttonText={props.onRenderLoading ? "Сохранение..." : "Сохранить"} isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonState={avatarValidity && avatar}>
          <input type="url" className={avatarValidity ? "popup__input" : "popup__input popup__input_active"} id ="avatar-link-popup__input" name ="avatar" value={avatar} placeholder="Ссылка на картинку" required onChange={handleAvatarChange}/>
          <span className="popup__input-error" id="avatar-link-popup__input-error">{avatarError}</span>        
        </PopupWithForm>
    );
  }
  
export default EditAvatarPopup;