//// Imports ////
import {
  openPopup,
  closePopup,
  imagePopup,
  editProfilePopup,
  addCardPopup,
  profileEditButton,
  cardPopupCloseButton,
} from "./utils.js";

import { resetValidationError, toggleButtonState } from "./formValidator.js";

//// decleratoins /////
(function () {
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
  ///// Forms ////
  const editForm = document.querySelector(".edit__form");
  const addForm = addCardPopup.querySelector(".add__form");

  /////Form Buttons///
  const formButton = document.querySelector(".form__button");

  //wrappers///

  const cardContainer = document.querySelector(".gallery__container");

  //Inputs//

  const nameInput = document.getElementById("name-input");
  const jobInput = document.getElementById("job-input");

  // Const Elements //
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  //// Popup functions////

  const openImagePreview = (card) => {
    const imagePopupImage = imagePopup.querySelector(".image__popup");
    const imagePopupDecription = imagePopup.querySelector(
      ".image__discription"
    );
    imagePopupImage.src = card.link;
    imagePopupImage.alt = card.name;
    imagePopupDecription.textContent = card.name;

    openPopup(imagePopup);
  };

  /// Form Functions ///

  function fillProfileForm() {
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
    resetValidationError(addForm);
  }

  /// Card Function ///

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
    const trashButton = cardElement.querySelector(
      ".gallery__card-trash-button"
    );

    likeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__card-like_button_active");
    });

    trashButton.addEventListener("click", function () {
      cardElement.remove(cardElement);
    });

    return cardElement;
  }

  function renderCard(card, wrraper) {
    wrraper.append(createCardElement(card));
  }

  initialCards.forEach((card) => renderCard(card, cardContainer));

  /////event listeners/////

  /// Edit Profile From ///

  profileEditButton.addEventListener("click", fillProfileForm);

  editForm.addEventListener("submit", handleProfileEditFormSubmit);

  /// Add Card Popup ///

  cardPopupCloseButton.addEventListener("click", resetValidationError(addForm));

  addForm.addEventListener("submit", handleCardFormSubmit);

  /// General ///

  ///const removeCard = (card) => {};

  /// Classes ////
})();
