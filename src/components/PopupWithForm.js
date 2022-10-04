function PopupWithForm(props) {
    return (      
        <div className={props.isOpened ? 'popup popup_opened' : 'popup'} id={`${props.name}-popup`}>
            <div className="popup__container">
                <button type="reset" className="popup__close-button" id={`${props.name}-popup__close-button`}  onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className = "popup__form" id={`${props.name}-popup__form`} name={`${props.name}-edit-form`} onSubmit={props.onSubmit}>
                    <fieldset className="popup__inputs">
                        {props.children}
                        <input type="submit" className="popup__save-button" id={`${props.name}-popup__save-button`} value={props.buttonText} disabled={!props.buttonState}/>
                    </fieldset>                
                </form>
            </div>
        </div>
    );
  }
  
export default PopupWithForm;    