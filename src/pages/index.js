import "./index.css";

import Section from "../scripts/components/section.js";

import Card from "../scripts/components/card.js";

import FormValidator from "../scripts/components/formValidator.js";

import PopupWithForm from "../scripts/components/popup-with-form.js";

import { PopupWithImage } from "../scripts/components/popup-with-image.js";

import UserInfo from "../scripts/components/user-info.js";

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
  nameInput,
  jobInput,
  imagePopup,
} from "../scripts/utils/constants.js";

const imagePopupModle = new PopupWithImage(imagePopup);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    imagePopupModle.open(cardData.image, cardData.text);
  });
  return card.generateCard();
}

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);

      cardsList.addItem(cardElement);
    },
  },
  cardContainer
);

cardsList.renderItems();

/// Form Functions ///

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__name-discription",
});

const editProfilePopup = new PopupWithForm(editProfileModule, (inputValues) => {
  profileInfo.setUserInfo({ name: inputValues.name, job: inputValues.job });
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(addCardModule, (inputValues) => {
  const cardElement = createCard({
    text: inputValues.title,
    image: inputValues.image,
  });

  cardsList.addItem(cardElement);

  addCardPopup.close();
  addForm.reset();
  addFormValidator.resetValidationError();
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopupModle.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const formInputs = profileInfo.getUserInfo();
  nameInput.value = formInputs.name;
  jobInput.value = formInputs.job;

  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
