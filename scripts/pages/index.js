import Section from "../components/section.js";

import PopupWithForm from "../components/popup-with-form";

import { createCard } from "../components/card.js";

import FormValidator from "../utils/formValidator.js";

import {
  initialCards,
  defaultConfig,
  cardContainer,
  addForm,
  editForm,
  profileName,
  profileJob,
  editProfilePopup,
  addCardPopup,
  nameInput,
  jobInput,
} from "../utils/constats.js";

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardContainer.append(cardElement);
});

/// Form Functions ///

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

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

const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
