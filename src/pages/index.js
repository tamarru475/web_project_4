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

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    const cardsList = new Section(
      {
        data: cardData,
        renderer: (item) => {
          const cardElement = createCard(item);

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
  })
  .catch((err) => {
    console.log(err);
  });

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
          api
            .deleteCard(id)
            .then(() => {
              card.removeCard();
              deletePopupModle.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              deletePopupModle.renderLoading(false);
            });
        });
      },
      handleLikeClick: (id) => {
        const alreadyLiked = card.isLiked();

        if (alreadyLiked) {
          api
            .unlikeCard(id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeCard(id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
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
  api
    .sendUserAavatar(inputValue)
    .then(() => {
      profileInfo.setUserAvatar(inputValue);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
});

const editProfilePopup = new PopupWithForm(editProfileModule, (inputValues) => {
  editProfilePopup.renderLoading(true);
  api
    .sendUserInfo(inputValues)
    .then(() => {
      profileInfo.setUserInfo({ name: inputValues.name, job: inputValues.job });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});

const addCardPopup = new PopupWithForm(addCardModule, (inputValues) => {
  addCardPopup.renderLoading(true);
  api
    .sendNewCard(inputValues)
    .then((card) => {
      const cardsElement = createCard(card);
      cardContainer.prepend(cardsElement);
      addCardPopup.close();
      addForm.reset();
      addFormValidator.resetValidationError();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopupModle.setEventListeners();
deletePopupModle.setEventListeners();
editAvatarPopup.setEventListeners();

function fillUserInfoForm(info) {
  nameInput.value = info.name;
  jobInput.value = info.job;
  avatarInput.value = info.avatar;
}

function fillAvatarForm(info) {
  avatarInput.value = info.avatar;
}

avatarImage.addEventListener("click", () => {
  const formInputs = profileInfo.getUserInfo();

  fillAvatarForm(formInputs);

  editAvatarPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const formInputs = profileInfo.getUserInfo();

  fillUserInfoForm(formInputs);

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
