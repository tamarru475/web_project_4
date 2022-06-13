import Section from "../components/section.js";

import { createCard } from "../components/card.js";

import FormValidator from "../utils/formValidator.js";

import PopupWithForm from "../components/popup-with-form.js";

import UserInfo from "../components/user-info.js";

import {
  initialCards,
  defaultConfig,
  cardContainer,
  addForm,
  editForm,
  editProfileModule,
  addCardModule,
  profileAddButton,
  profileEditButton,
} from "../utils/constants.js";

const initialCardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);

      initialCardsList.addItem(cardElement);
    },
  },
  cardContainer
);

initialCardsList.renderItems();

/// Form Functions ///

const editProfilePopup = new PopupWithForm(editProfileModule, (inputValues) => {
  const profileInfo = new UserInfo(inputValues.name, inputValues.job);

  profileInfo.setUserInfo();
  profileInfo.getUserInfo();
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(addCardModule, (inputValues) => {
  const cardElement = createCard({
    text: inputValues.title,
    image: inputValues.image,
  });
  cardContainer.prepend(cardElement);

  addCardPopup.close();
  addFormValidator.resetValidationError();
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
