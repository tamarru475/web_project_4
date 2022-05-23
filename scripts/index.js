//// Imports ////
import { openPopup, closePopup } from "./utils.js";

import { imagePopup, createCard } from "./card.js";

import FormValidator from "./formValidator.js";

///// popups////
const editProfilePopup = document.querySelector(".edit");
const addCardPopup = document.querySelector(".add");

/////buttons///
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = editProfilePopup.querySelector(
  ".edit__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const cardPopupCloseButton = addCardPopup.querySelector(".add__close-button");
const imagePopupCloseButton = imagePopup.querySelector(".image__close-button");

//// Wraapers /////

const cardContainer = document.querySelector(".gallery__container");

///// Forms ////
const editForm = document.querySelector(".edit__form");
const addForm = addCardPopup.querySelector(".add__form");

//Inputs//
const nameInput = document.getElementById("name-input");
const jobInput = document.getElementById("job-input");

// Const Elements //
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__name-discription");

/// Card Rendering  ///

const initialCards = [
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
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardContainer.append(cardElement);
});

/// Form Functions ///

function fillEditForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editProfilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titelInput = document.getElementById("title-input");
  const imageInput = document.getElementById("imagelink-input");

  const cardElement = createCard({
    text: titelInput.value,
    image: imageInput.value,
  });
  cardContainer.prepend(cardElement);

  closePopup(addCardPopup);
  addForm.reset();
  addFormValidator.resetValidationError();
}

/////event listeners/////

/// Edit Profile Popup ///

profileEditButton.addEventListener("click", () => openPopup(editProfilePopup));

profilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
profileEditButton.addEventListener("click", fillEditForm);

editForm.addEventListener("submit", handleProfileEditFormSubmit);

/// Add Card Popup ///

profileAddButton.addEventListener("click", () => openPopup(addCardPopup));

cardPopupCloseButton.addEventListener("click", () => closePopup(addCardPopup));

addForm.addEventListener("submit", handleCardFormSubmit);

/// Image Popup ///

imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));

/// Validation ///

const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
