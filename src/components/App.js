import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import sorryImage from '../images/ups2.png';

function App() {
  const [isProfilePopupOpen, setProfilePopupOpenState] = React.useState(false);
  const [isTilesPopupOpen, setTilesPopupOpenState] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpenState] = React.useState(false);
  const [selectedCard, selectCard] = React.useState('');
  const handleEditAvatarClick = () => {setAvatarPopupOpenState(true)};
  const handleEditProfileClick = () => {setProfilePopupOpenState(true)};
  const handleAddTileClick = () => {setTilesPopupOpenState(true)}
  const handleCardClick = (card) => {
    selectCard(card)
  };
  const closeAllPopups = () => {
    setAvatarPopupOpenState(false);
    setProfilePopupOpenState(false);
    setTilesPopupOpenState(false);
    selectCard('');
  }
  return (
    <div>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddTile={handleAddTileClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} sorryImage={sorryImage}/>
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="profile" isOpened={isProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" className="popup__input" id ="author-name-popup__input" name ="name" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__input-error" id="author-name-popup__input-error"></span>
        <input type="text" className="popup__input" id ="author-job-popup__input" name ="about" placeholder="Деятельность" required minLength="2" maxLength="200" />
        <span className="popup__input-error" id="author-job-popup__input-error"></span>
        <input type="submit" className="popup__save-button" id="profile-popup__save-button" value="Сохранить" />
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="tiles" isOpened={isTilesPopupOpen} onClose={closeAllPopups}>
        <input type="text" className="popup__input" id ="place-name-popup__input" name ="name" placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__input-error" id="place-name-popup__input-error"></span>
        <input type="url" className="popup__input" id ="place-link-popup__input" name ="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="place-link-popup__input-error"></span>
        <input type="submit" className="popup__save-button" id="tiles-popup__save-button" value="Сохранить" />
      </PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="avatar" isOpened={isAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" className="popup__input" id ="avatar-link-popup__input" name ="avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="avatar-link-popup__input-error"></span>
        <input type="submit" className="popup__save-button" id="avatar-popup__save-button" value="Сохранить" />
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="sure">
        <input type="submit" className="popup__save-button" id="sure-popup__save-button" value="Да" />
      </PopupWithForm>
      <PopupWithImage card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
