import React from 'react';

function Card(props) {
    const [imageErrorState, setImageErrorState] = React.useState(false);  

    function handleClick() {
        if (imageErrorState) {
            const cardWithError = Object.assign({},props.card);
            cardWithError.link = props.sorryImage;
            props.onCardClick(cardWithError)
        }
        else {props.onCardClick(props.card)}
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
                    <button className="tiles__like" type="button"></button>
                    <p className="tiles__like-count">{props.card.likes.length}</p>
                </div>  
            </div>
             <button className="tiles__delete-button" type="button"></button>
        </div>
    );
}
  
export default Card;