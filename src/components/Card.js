import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [imageErrorState, setImageErrorState] = React.useState(false);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        if (imageErrorState) {
            const cardWithError = Object.assign({},props.card);
            cardWithError.link = props.sorryImage;
            props.onCardClick(cardWithError)
        }
        else {props.onCardClick(props.card)}
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (        
        <div className="tiles__item" id={props.card._id}>
            <img 
                className="tiles__image"
                src={props.card.link}
                alt={props.card.name}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src=props.sorryImage;
                    setImageErrorState(true)       
                }}
                onClick={handleClick}                      
            />
            <div className="tiles__place">
                 <h2 className="tiles__title">{props.card.name}</h2>
                <div className="tiles__likes">
                    <button className={isLiked ? 'tiles__like tiles__like_active' : 'tiles__like'} onClick={handleLikeClick} type="button"></button>
                    <p className="tiles__like-count">{props.card.likes.length}</p>
                </div>  
            </div>
            {isOwn && <button className="tiles__delete-button" onClick={handleDeleteClick} type="button"></button>}
        </div>
    );
}
  
export default Card;