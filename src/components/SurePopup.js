import PopupWithForm from './PopupWithForm';
import React from 'react';

function SurePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard();
    }

    return (     
        <PopupWithForm title="Вы уверены?" name="sure" buttonText={props.onRenderLoading ? "Сохранение..." : "Да"} isOpened={props.card._id ? true : false} onClose={props.onClose} onSubmit={handleSubmit} buttonState={true}/>
    );
}
  
export default SurePopup;