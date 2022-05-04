//// Imports ////
import { resetValidationError, toggleButtonState } from "./validation.js";

//// decleratoins /////

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

///// popups////
const editProfilePopup = document.querySelector(".edit");
const editForm = document.querySelector(".edit__form");
const addCardPopup = document.querySelector(".add");
const addForm = addCardPopup.querySelector(".add__form");
const imagePopup = document.querySelector(".image");

/////buttons///
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = editProfilePopup.querySelector(
  ".edit__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const cardPopupCloseButton = addCardPopup.querySelector(".add__close-button");
const imagePopupCloseButton = imagePopup.querySelector(".image__close-button");
const formButton = document.querySelector(".form__button");

//wrappers///

const cardContainer = document.querySelector(".gallery__container");

//inputs//

const nameInput = document.getElementById("name-input");
const jobInput = document.getElementById("job-input");

////functions////

function openPopup(popupModel) {
  popupModel.classList.add("popup_fadein");
  popupModel.classList.remove("popup_fadeout");
}

function closePopup(popupModel) {
  popupModel.classList.add("popup_fadeout");
  popupModel.classList.remove("popup_fadein");
}

function fillProfileForm() {
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");
  const inputList = Array.from(editForm.querySelectorAll(".form__input"));

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  toggleButtonState(inputList, formButton);
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

  cardContainer.prepend(
    createCardElement({ name: titelInput.value, link: imageInput.value })
  );

  closePopup(addCardPopup);
  addForm.reset();
}

function createCardElement(card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".gallery__card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-place");

  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => openImagePreview(card));

  const likeButton = cardElement.querySelector(".gallery__card-like_button");
  const trashButton = cardElement.querySelector(".gallery__card-trash-button");

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("gallery__card-like_button_active");
  });

  trashButton.addEventListener("click", function () {
    cardElement.remove(cardElement);
  });

  return cardElement;
}

const openImagePreview = (card) => {
  const imagePopupImage = imagePopup.querySelector(".image__popup");
  const imagePopupDidcription = imagePopup.querySelector(".image__discription");
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  imagePopupDidcription.textContent = card.name;

  openPopup(imagePopup);
  imagePopup.addEventListener("click", closePopupWhenEsc(imagePopup));
};

function renderCard(card, wrraper) {
  wrraper.append(createCardElement(card));
}

const closePopupWhenLayover = (popupModel) => {
  popupModel.addEventListener("mousedown", function (evt) {
    const isClosest = evt.target.closest(".container");
    const popupForm = popupModel.querySelector(".form");

    if (
      !isClosest &&
      popupModel.classList.contains("popup_fadein") &&
      popupModel.classList.contains(".form")
    ) {
      closePopup(popupModel);
      removeClosePopupEsc;
      resetValidationError(popupForm);
    } else if (!isClosest && popupModel.classList.contains("popup_fadein")) {
      closePopup(popupModel);
      removeClosePopupEsc;
    }
  });
};

function closePopupWhenEsc(popupModel) {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popupModel);
    } else if (popupModel.classList.contains(".form")) {
      const formElement = popupModel.querySelector(".form");
      resetValidationError(formElement);
    }
  });
}

function removeClosePopupEsc() {
  document.removeEventListener("keydown", closePopupWhenEsc);
}

const resetErrorUponClose = (popupModel, closeButtonElement) => {
  popupModel.addEventListener("click", function (evt) {
    if (evt.target == closeButtonElement) {
      const popupForm = popupModel.querySelector(".form");
      resetValidationError(popupForm);
    }
  });
};

/////event listeners/////

/// Edit Profile Popup ///

profileEditButton.addEventListener("click", () => openPopup(editProfilePopup));

profileEditButton.addEventListener(
  "click",
  closePopupWhenEsc(editProfilePopup)
);

profilePopupCloseButton.addEventListener("click", removeClosePopupEsc);

profileEditButton.addEventListener("click", fillProfileForm);

profilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);

editForm.addEventListener("submit", handleProfileEditFormSubmit);

closePopupWhenLayover(editProfilePopup);

resetErrorUponClose(editProfilePopup, profilePopupCloseButton);

/// Add Card Popup ///

profileAddButton.addEventListener("click", () => openPopup(addCardPopup));

profileAddButton.addEventListener("click", closePopupWhenEsc(addCardPopup));

cardPopupCloseButton.addEventListener("click", () => closePopup(addCardPopup));

cardPopupCloseButton.addEventListener("click", removeClosePopupEsc);

cardPopupCloseButton.addEventListener("click", resetValidationError(addForm));

addForm.addEventListener("submit", handleCardFormSubmit);

closePopupWhenLayover(addCardPopup);
resetErrorUponClose(addCardPopup, cardPopupCloseButton);

/// Image Popup ///

imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));

imagePopupCloseButton.addEventListener(
  "click",
  removeClosePopupEsc(imagePopup)
);

closePopupWhenLayover(imagePopup);

/// General ///

///const removeCard = (card) => {};

///template////

initialCards.forEach((card) => renderCard(card, cardContainer));
