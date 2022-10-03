import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddTilesPopup from './AddTilesPopup';
import SurePopup from './SurePopup';
import {api} from '../utils/Api.js';
import {CurrentUserContext} from './contexts/CurrentUserContext';
import sorryImage from '../images/ups2.png';

function App() {
  const [currentUser, setCurrentUser] = React.useState({name: 'иван', about: '', avatar: '', _id: ''});
  const [cards, addCards] = React.useState([]);
  const [isProfilePopupOpen, setProfilePopupOpenState] = React.useState(false);
  const [isTilesPopupOpen, setTilesPopupOpenState] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpenState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpenState] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({name: '', link: ''});
  const [deletedCard, deleteCard] = React.useState({_id: ''});
  const [isRenderLoading, setRenderLoading] = React.useState(false);
  
  const handleEditAvatarClick = () => {setAvatarPopupOpenState(true)};

  const handleEditProfileClick = () => {setProfilePopupOpenState(true)};

  const handleAddTileClick = () => {setTilesPopupOpenState(true)}

  const handleDeleteCardClick = (card) => {
    deleteCard(card)
  };
  
  const handleCardClick = (card) => {    
    selectCard(card);
    setImagePopupOpenState(true);
  };

  const handleUpdateUser = (name, about) => {
    setRenderLoading(true);
    api.setUserInfo(name, about)
    .then(values => {
      setCurrentUser(values);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setRenderLoading(false))
  };
  
  const handleUpdateAvatar = (avatar) => {
    setRenderLoading(true);
    api.setUserAvatar(avatar)
    .then(values => {
      setCurrentUser(values);
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setRenderLoading(false))
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, isLiked)
        .then(newCard => {
            addCards((state) => state.map((c) => c._id === card._id ? newCard : c));  
        })
        .catch(err => console.log(err))
  }

  const handleCardDelete = () => {
    setRenderLoading(true);
    api.deleteCard(deletedCard._id)
      .then(() => {
        addCards((state) => state.filter((c) => c._id != deletedCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setRenderLoading(false))
} 

  const handleAddPlaceSubmit = (name, link) => {
    setRenderLoading(true);
    api.addNewCard(name, link)
    .then(newCard => {
      addCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => setRenderLoading(false))
  }

  const clearImage = () => {
    selectCard({name: '', link: ''});
  }

  const closeAllPopups = () => {
    setAvatarPopupOpenState(false);
    setProfilePopupOpenState(false);
    setTilesPopupOpenState(false);
    setImagePopupOpenState(false);  
    setTimeout(clearImage, 500);
    deleteCard({_id: ''});
  }
  
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(values => {
        const [initialUser, initialCards] = values;
        setCurrentUser(initialUser)
        addCards(initialCards)
      })
      .catch(err => console.log(err))       
  }, []);

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />      
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddTile={handleAddTileClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          cards={cards}
          onCardLike={handleCardLike} 
          onCardDelete={handleDeleteCardClick} 
          sorryImage={sorryImage}
        />
        <Footer />
        <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onRenderLoading={isRenderLoading}/>
        <AddTilesPopup isOpen={isTilesPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onRenderLoading={isRenderLoading}/>        
        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onRenderLoading={isRenderLoading}/>        
        <SurePopup card={deletedCard} onClose={closeAllPopups} onDeleteCard={handleCardDelete} onRenderLoading={isRenderLoading}/>
        <PopupWithImage isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>       
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
