function PopupWithImage(props) {
    return (        
        <div className={props.card ? 'popup popup_opened' : 'popup'} id="image-popup">
            <div className="popup__image-container">
                <button type="reset" className="popup__close-button" id="image-popup__close-button" onClick={props.onClose}></button>
                <img 
                    className="popup__image" 
                    src={props.card && props.card.link}
                    alt={props.card && props.card.name}
                    />
                <p className="popup__image-description">{props.card.name}</p>
            </div>
        </div>
    );
  }
  
export default PopupWithImage;