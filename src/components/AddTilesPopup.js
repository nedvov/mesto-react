import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddTilesPopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [nameValidity, setNameValidity] = React.useState(true);
    const [linkValidity, setLinkValidity] = React.useState(true);
    const [nameError, setNameError] = React.useState('');
    const [linkError, setLinkError] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
        setNameValidity(e.target.validity.valid);
        setNameError(e.target.validationMessage);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
        setLinkValidity(e.target.validity.valid);
        setLinkError(e.target.validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(name, link);
    }

    function handlePopupClose() {
        props.onClose();
        setNameValidity(true);
        setLinkValidity(true);
        setName('');
        setLink('');
        setNameError('');
        setLinkError('');
    }

    return (        
        <PopupWithForm title="Новое место" name="tiles" buttonText={props.onRenderLoading ? "Сохранение..." : "Сохранить"} isOpened={props.isOpen} onClose={handlePopupClose} onSubmit={handleSubmit} buttonState={nameValidity && linkValidity && name && link}>
            <input type="text" className={nameValidity ? "popup__input" : "popup__input popup__input_active"} id ="place-name-popup__input" name ="name" placeholder="Название" required minLength="2" maxLength="30" onChange={handleNameChange}/>
            <span className="popup__input-error" id="place-name-popup__input-error">{nameError}</span>
            <input type="url" className={linkValidity ? "popup__input" : "popup__input popup__input_active"} id ="place-link-popup__input" name ="link" placeholder="Ссылка на картинку" required onChange={handleLinkChange}/>
            <span className="popup__input-error" id="place-link-popup__input-error">{linkError}</span>       
        </PopupWithForm>
    );
  }
  
export default AddTilesPopup;