import "./index.css";

import Section from "../scripts/components/section.js";

import Card from "../scripts/components/card.js";

import FormValidator from "../scripts/components/formValidator.js";

import PopupWithButton from "../scripts/components/popup-with-Button.js";

import PopupWithForm from "../scripts/components/popup-with-form.js";

import { PopupWithImage } from "../scripts/components/popup-with-image.js";

import UserInfo from "../scripts/components/user-info.js";

import {
  defaultConfig,
  cardContainer,
  addForm,
  editForm,
  editProfileModule,
  addCardModule,
  profileAddButton,
  profileEditButton,
  profileName,
  profileJob,
  nameInput,
  avatarImage,
  jobInput,
  imagePopup,
  deletePopup,
} from "../scripts/utils/constants.js";

import Api from "../scripts/components/api.js";

/// apis and initial load

const apiUserInfo = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/users/me",
  headers: {
    authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
    "Content-Type": "application/json",
  },
});

apiUserInfo.getUserInfo(profileName, profileJob, avatarImage);

const apiCards = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/cards",
  headers: {
    authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
    "Content-Type": "application/json",
  },
});

apiCards.getInitialCards(Section, cardContainer, createCard);

const imagePopupModle = new PopupWithImage(imagePopup);
const deletePopupModle = new PopupWithButton(deletePopup, () => {
  console.log("what now?");
  deletePopupModle.close();
});

/// initial load functions ///

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      imagePopupModle.open(cardData.link, cardData.name);
    },
    () => {
      deletePopupModle.open();
    }
  );
  return card.generateCard();
}

/// Form Functions ///

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__name-discription",
});

const editProfilePopup = new PopupWithForm(editProfileModule, (inputValues) => {
  profileInfo.setUserInfo({ name: inputValues.name, job: inputValues.job });
  editProfilePopup.close();
  apiUserInfo.sendUserInfo(inputValues);
});

const addCardPopup = new PopupWithForm(addCardModule, (inputValues) => {
  const cardElement = createCard({
    name: inputValues.title,
    link: inputValues.image,
  });

  cardContainer.prepend(cardElement);

  addCardPopup.close();
  addForm.reset();
  addFormValidator.resetValidationError();
  apiCards.sendNewCard(inputValues);
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopupModle.setEventListeners();
deletePopupModle.setEventListeners();

function fillInfoForm(info) {
  nameInput.value = info.name;
  jobInput.value = info.job;
}

profileEditButton.addEventListener("click", () => {
  const formInputs = profileInfo.getUserInfo();

  fillInfoForm(formInputs);

  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
