import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddTilesPopup from './AddTilesPopup';
import SurePopup from './SurePopup';
import Sign from './Sign';
import Register from './Register';
import {api} from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import sorryImage from '../images/ups2.png'; 

function App() {
  const [currentUser, setCurrentUser] = React.useState({name: 'иван', about: '', avatar: '', _id: ''});
  const [cards, addCards] = React.useState([]);
  const [isProfilePopupOpen, setProfilePopupOpenState] = React.useState(false);
  const [isTilesPopupOpen, setTilesPopupOpenState] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpenState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpenState] = React.useState(false);
  const [selectedCard, selectCard] = React.useState({name: '', link: ''});
  const [cardToDelete, setCardToDelete] = React.useState({_id: ''});
  const [isRenderLoading, setRenderLoading] = React.useState(false);
  const isOpen = (isAvatarPopupOpen || isProfilePopupOpen || isTilesPopupOpen || isImagePopupOpen || cardToDelete._id);
  const handleEditAvatarClick = () => {setAvatarPopupOpenState(true)};

  const handleEditProfileClick = () => {setProfilePopupOpenState(true)};

  const handleAddTileClick = () => {setTilesPopupOpenState(true)}

  const handleDeleteCardClick = (card) => {
    setCardToDelete(card)
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
    api.deleteCard(cardToDelete._id)
      .then(() => {
        addCards((state) => state.filter((c) => c._id != cardToDelete._id));
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
    setCardToDelete({_id: ''});
  }

  const handleClick1 = () => {
    alert('Выход')
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

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    
    function closeByOuterClick(evt) {
      const popup = document.querySelector('.popup_opened')
      const withinBoundaries = evt.composedPath().includes(popup.children[0]);     
      if (!withinBoundaries) {
        closeAllPopups();
      }      
    }

    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mouseup', closeByOuterClick);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('mouseup', closeByOuterClick);
      }
    }
    
  }, [isOpen]) 

  return (
    <CurrentUserContext.Provider value={currentUser}>           
      <Switch>
        <Route exact path="/">
          {1===2 && <Redirect to="/sign-in" />}
          <Header isLogged={true}>
            <button type="button" className="header__button" onClick={handleClick1}>Выйти</button>
          </Header>
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
          <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onRenderLoading={isRenderLoading}/>
          <AddTilesPopup isOpen={isTilesPopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onRenderLoading={isRenderLoading}/>        
          <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onRenderLoading={isRenderLoading}/>        
          <SurePopup card={cardToDelete} onClose={closeAllPopups} onDeleteCard={handleCardDelete} onRenderLoading={isRenderLoading}/>
          <PopupWithImage isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
        </Route>
        <Route path="/sign-in">
          <Header isLogged={false}>
            <Link to="/sign-up" className="header__button">Регистрация</Link>
          </Header>
          <Sign name="in" title="Вход" onSubmit={handleClick1} buttonText="Войти" />          
        </Route>
        <Route path="/sign-up">
          <Header isLogged={false}>
            <Link to="/sign-in" className="header__button">Войти</Link>
          </Header>
          <Sign name="up" title="Регистрация" onSubmit={handleClick1} buttonText="Зарегистрироваться">
            <Link to="/sign-in" className="sign__link">Уже зарегистрированы? Войти</Link>
          </Sign>  
        </Route>        
        <Route path="*">
          {1===2 ? <Redirect to="/" />: <Redirect to="/sign-in" />}          
        </Route>               
      </Switch>
      <Footer />        
    </CurrentUserContext.Provider>
  );
}

export default App;
