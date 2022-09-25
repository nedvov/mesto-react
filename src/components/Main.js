import {api} from '../utils/Api.js';
import React from 'react';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, addCards] = React.useState([]);
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(values => {
                const [initialUser, initialCards] = values;
                setUserName(initialUser.name)
                setUserDescription(initialUser.about)
                setUserAvatar(initialUser.avatar)
                addCards(initialCards)
            })
            .catch(err => console.log(err))        
    }, []);
    return (        
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img 
                        className="profile__avatar-image" 
                        alt="Ваш аватар" 
                        src={userAvatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src=props.sorryImage;      
                        }}
                    />
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>   
                </div>           
                <div className="profile__info">
                    <h1 className="profile__author-name">{userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__author-job">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddTile}></button>
            </section>
            <section className="tiles">
                {cards.map((card, i) => (            
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} sorryImage={props.sorryImage}/>
                ))}
            </section>
        </main>
    );
  }
  
export default Main;