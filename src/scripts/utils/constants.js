///// popups////
export const editProfileModule = document.querySelector(".edit");
export const addCardModule = document.querySelector(".add");
export const imagePopup = document.querySelector(".image");

/////buttons///
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profilePopupCloseButton = editProfileModule.querySelector(
  ".edit__close-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const cardPopupCloseButton =
  addCardModule.querySelector(".add__close-button");
export const imagePopupCloseButton = imagePopup.querySelector(
  ".image__close-button"
);

//// Wraapers /////
export const cardsContainer = document.getElementById("gallery-container");
export const cardContainer = document.querySelector(".gallery__container");

///// Forms ////
export const editForm = document.querySelector(".edit__form");
export const addForm = addCardModule.querySelector(".add__form");

//Inputs//
export const nameInput = document.getElementById("name-input");
export const jobInput = document.getElementById("job-input");

// Const Elements //
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__name-discription");
export const avatarImage = document.querySelector(".profile__image");

/// Card Rendering  ///

export const initialCards = [
  {
    text: "Yosemite Valley",
    image: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    text: "Lake Louise",
    image: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    text: "Bald Mountains",
    image: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    text: "Latemar",
    image: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    text: "Vanoise National Park",
    image: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    text: "Lago di Braies",
    image: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

export const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
