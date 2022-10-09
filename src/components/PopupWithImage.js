function PopupWithImage({isOpen, onClose, card}) {
    return (        
        <div className={isOpen ? 'popup popup_opened' : 'popup'} id="image-popup">
            <div className="popup__image-container">
                <button type="reset" className="popup__close-button" id="image-popup__close-button" onClick={onClose}></button>
                <img 
                    className="popup__image" 
                    src={card.link && card.link}
                    alt={card.link && card.name}
                    />
                <p className="popup__image-description">{card.name}</p>
            </div>
        </div>
    );
  }
  
export default PopupWithImage;