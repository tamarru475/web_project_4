import "./index.css";

import Section from "../scripts/components/section.js";

import Card from "../scripts/components/card.js";

import FormValidator from "../scripts/components/formValidator.js";

import PopupWithSubmit from "../scripts/components/popup-with-submit.js";

import PopupWithForm from "../scripts/components/popup-with-form.js";

import { PopupWithImage } from "../scripts/components/popup-with-image.js";

import UserInfo from "../scripts/components/user-info.js";

import {
  defaultConfig,
  cardContainer,
  avatarImage,
  avatarForm,
  addForm,
  editForm,
  editAvatarModule,
  editProfileModule,
  addCardModule,
  profileAddButton,
  profileEditButton,
  nameInput,
  jobInput,
  avatarInput,
  imagePopup,
  deletePopup,
} from "../scripts/utils/constants.js";

import Api from "../scripts/components/api.js";

/// apis and initial load

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "6a85a377-e76e-4e72-85a9-79ee5208e36a",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cardData, userData]) => {
    userId = userData._id;
    const cardsList = new Section(
      {
        data: cardData,
        renderer: (item) => {
          const cardElement = createCard(item);

          if (item.owner._id !== userId) {
            const trashButton = cardElement.querySelector(
              ".gallery__card-trash-button"
            );
            trashButton.classList.remove("gallery__card-trash-button_active");
          }

          cardsList.addItem(cardElement);
        },
      },
      cardContainer
    );

    cardsList.renderItems();

    profileInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    profileInfo.setUserAvatar({
      avatar: userData.avatar,
    });
  }
);

const imagePopupModle = new PopupWithImage(imagePopup);
const deletePopupModle = new PopupWithSubmit(deletePopup);

/// initial load functions ///

function createCard(cardData) {
  const card = new Card(
    {
      data: cardData,
      handleImageClick: () => {
        imagePopupModle.open(cardData.link, cardData.name);
      },
      handleTrashClick: (id) => {
        deletePopupModle.open();
        deletePopupModle.setAction(() => {
          deletePopupModle.renderLoading(true);
          api.deleteCard(id).finally(() => {
            deletePopupModle.renderLoading(false);
            card.removeCard();
            deletePopupModle.close();
          });
        });
      },
      handleLikeClick: (id) => {
        const alreadyLiked = card.isLiked();

        if (alreadyLiked) {
          api.unlikeCard(id).then((res) => {
            card.likeCard(res.likes);
          });
        } else {
          api.likeCard(id).then((res) => {
            card.likeCard(res.likes);
          });
        }
      },
    },
    "#card-template",
    userId
  );
  return card.generateCard();
}

/// Form Functions ///

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__name-discription",
  avatarSelector: ".profile__image",
});

const editAvatarPopup = new PopupWithForm(editAvatarModule, (inputValue) => {
  editAvatarPopup.renderLoading(true);
  api.sendUserAavatar(inputValue).finally(() => {
    editAvatarPopup.renderLoading(false);
    profileInfo.setUserAvatar(inputValue);
    editAvatarPopup.close();
  });
});

const editProfilePopup = new PopupWithForm(editProfileModule, (inputValues) => {
  editProfilePopup.renderLoading(true);
  api.sendUserInfo(inputValues).finally(() => {
    editProfilePopup.renderLoading(false);
    profileInfo.setUserInfo({ name: inputValues.name, job: inputValues.job });
    editProfilePopup.close();
  });
});

const addCardPopup = new PopupWithForm(addCardModule, (inputValues) => {
  addCardPopup.renderLoading(true);
  console.log("is Loading");
  api
    .sendNewCard(inputValues)
    .then((card) => {
      const cardsElement = createCard(card);
      cardContainer.prepend(cardsElement);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
      addCardPopup.close();
      addForm.reset();
      addFormValidator.resetValidationError();
    });
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopupModle.setEventListeners();
deletePopupModle.setEventListeners();
editAvatarPopup.setEventListeners();

function fillInfoForm(info) {
  nameInput.value = info.name;
  jobInput.value = info.job;
  avatarInput.value = info.avatar;
}

avatarImage.addEventListener("click", () => {
  const formInputs = profileInfo.getUserInfo();

  fillInfoForm(formInputs);

  editAvatarPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const formInputs = profileInfo.getUserInfo();

  fillInfoForm(formInputs);

  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

const avatarFromValidator = new FormValidator(defaultConfig, avatarForm);
const editFormValidator = new FormValidator(defaultConfig, editForm);
const addFormValidator = new FormValidator(defaultConfig, addForm);

avatarFromValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();
