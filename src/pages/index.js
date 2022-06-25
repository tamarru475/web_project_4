import "./index.css";

import Section from "../scripts/components/section.js";

import Card from "../scripts/components/card.js";

import FormValidator from "../scripts/components/formValidator.js";

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
} from "../scripts/utils/constants.js";

fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
  headers: {
    authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Something went wrong: ${res.status}`);
    }
  })

  .then((user) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    avatarImage.src = user.avatar;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(console.log("is that what we were after?"));

fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
  headers: {
    authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Something went wrong: ${res.status}`);
    }
  })

  .then((initialCards) => {
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
    console.log(initialCards);
  })

  .catch((err) => {
    console.log(err);
  })
  .finally(() => console.log("is that what we were after?"));

const imagePopupModle = new PopupWithImage(imagePopup);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    imagePopupModle.open(cardData.link, cardData.name);
  });
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
  fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
    method: "PATCH",
    headers: {
      authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputValues.name,
      about: inputValues.job,
    }),
  });
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

  fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
    method: "POST",
    headers: {
      authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputValues.title,
      link: inputValues.image,
    }),
  });
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopupModle.setEventListeners();

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
