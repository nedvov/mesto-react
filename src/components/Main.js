import {CurrentUserContext} from './contexts/CurrentUserContext';
import React from 'react';
import Card from './Card';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);    
    
    return (        
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img 
                        className="profile__avatar-image" 
                        alt="Ваш аватар" 
                        src={currentUser.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src=props.sorryImage;      
                        }}
                    />
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>   
                </div>           
                <div className="profile__info">
                    <h1 className="profile__author-name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__author-job">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddTile}></button>
            </section>
            <section className="tiles">
                {props.cards.map((card, i) => (            
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} sorryImage={props.sorryImage}/>
                ))}
            </section>
        </main>
    );
  }
  
export default Main;