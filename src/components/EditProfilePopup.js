import PopupWithForm from './PopupWithForm';
import React from 'react';
import {CurrentUserContext} from './contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [nameValidity, setNameValidity] = React.useState(true);
    const [description, setDescription] = React.useState('');
    const [descriptionValidity, setDescriptionValidity] = React.useState(true);
    const [nameError, setNameError] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValidity(e.target.validity.valid);
        setNameError(e.target.validationMessage);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setDescriptionValidity(e.target.validity.valid);
        setDescriptionError(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
    }

    function handleClosePopup() {
      props.onClose()
      setName(currentUser.name);
      setDescription(currentUser.about);
      setNameValidity(true);
      setDescriptionValidity(true);
      setNameError('')
      setDescriptionError('')
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    return (        
        <PopupWithForm title="Редактировать профиль" name="profile" buttonText={props.onRenderLoading ? "Сохранение..." : "Сохранить"} isOpened={props.isOpen} onClose={handleClosePopup} onSubmit={handleSubmit} buttonState={nameValidity && descriptionValidity}>
          <input type="text" className={nameValidity ? "popup__input" : "popup__input popup__input_active"} id ="author-name-popup__input" name ="name" value={name} placeholder="Имя" required minLength="2" maxLength="40" onChange={handleNameChange}/>
          <span className="popup__input-error" id="author-name-popup__input-error">{nameError}</span>
          <input type="text" className={descriptionValidity ? "popup__input" : "popup__input popup__input_active"} id ="author-job-popup__input" name ="about" value={description} placeholder="Деятельность" required minLength="2" maxLength="200" onChange={handleDescriptionChange}/>
          <span className="popup__input-error" id="author-job-popup__input-error">{descriptionError}</span>        
        </PopupWithForm>
    );
  }
  
export default EditProfilePopup;