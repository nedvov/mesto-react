export const initialCards = [
    {
      likes: [{_id: "user1"}, {_id: "d1e48a1c380be879675ee8c0"}],
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      owner: {
        _id: 'd1e48a1c380be879675ee8c0'
      },
      id: '10001'
    },
    {
      likes: [{_id: "user1"}, {_id: "user2"}],
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      owner: {
        _id: 'user1'
      },
      id: '10002'
    },
    {
      likes: [{_id: "user1"}, {_id: "user2"}],
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      owner: {
        _id: 'd1e48a1c380be879675ee8c0'
      },
      id: '10003'
    },
    {
      likes: [{_id: "user1"}, {_id: "user2"}],
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      owner: {
        _id: 'user4'
      },
      id: '10004'
    },
    {
      likes: [{_id: "user1"}, {_id: "user2"}],
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      owner: {
        _id: 'user1'
      },
      id: '10005'
      
    },
    {
      likes: [{_id: "user1"}, {_id: "user2"}, {_id: "d1e48a1c380be879675ee8c0"}],
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      owner: {
        _id: 'user1'
      },
      id: '10006'
    }
];

export const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputError: '.popup__input-error',
    submitButtonSelector: '.popup__save-button',
    inputActive: 'popup__input_active'
};

export const cardSelectors = {
  templateSelector: '#tile',
  sectionSelector: '.tiles',
  cardSelector: '.tiles__item',
  imageSelector: '.tiles__image',
  titleSelector: '.tiles__title',
  likeSelector: '.tiles__like',
  likeActiveSelector: 'tiles__like_active',
  cardDeleteButtonSelector: '.tiles__delete-button',
  likesCountSelector: '.tiles__like-count'
}

export const popupSelectors = {
  profilePopup: '#profile-popup',
  tilesPopup: '#tiles-popup',
  imagePopup: '#image-popup',
  avatarPopup: '#avatar-popup',
  surePopup: '#sure-popup',
  openSelector: 'popup_opened',
  hiddenSelector: 'popup_hidden',
  closeButton: 'popup__close-button',
  popupImage: '.popup__image',
  popupImageDescription: '.popup__image-description'
}

export const UserInfoSelectors = {
  name: '.profile__author-name',
  about: '.profile__author-job',
  avatar: '.profile__avatar-image'
}

export const tilesFormElement = document.querySelector('#tiles-popup__form');
export const profileFormElement = document.querySelector('#profile-popup__form');
export const avatarFormElement = document.querySelector('#avatar-popup__form');

export const tilesAddButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');