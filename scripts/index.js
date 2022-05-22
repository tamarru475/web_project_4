//// Imports ////
import {
  openImagePreview,
  closePopup,
  editProfilePopup,
  addCardPopup,
  profileEditButton,
  cardPopupCloseButton,
} from "./utils.js";

import { cardContainer } from "./card.js";

import FormValidator from "./formValidator.js";

//// decleratoins /////
(function () {
  ///// Forms ////
  const editForm = document.querySelector(".edit__form");
  const addForm = addCardPopup.querySelector(".add__form");

  /////Form Buttons///
  const formButton = document.querySelector(".form__button");

  //wrappers///

  //Inputs//

  const nameInput = document.getElementById("name-input");
  const jobInput = document.getElementById("job-input");

  // Const Elements //
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  //// Popup functions////

  /// Form Functions ///

  function fillProfileForm() {
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

    cardContainer.prepend(
      createCardElement({ text: titelInput.value, image: imageInput.value })
    );
    closePopup(addCardPopup);
    addForm.reset();
    addFormValidator.resetValidationError();
  }

  function createCardElement(card) {
    const cardTemplate = document
      .querySelector("#card-template")
      .content.querySelector(".gallery__card");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".gallery__card-image");
    const cardTitle = cardElement.querySelector(".gallery__card-place");

    cardImage.style.backgroundImage = `url(${card.image})`;
    cardTitle.textContent = card.text;

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

  /// Edit Profile From ///

  profileEditButton.addEventListener("click", fillProfileForm);

  editForm.addEventListener("submit", handleProfileEditFormSubmit);

  /// Add Card Popup ///

  addForm.addEventListener("submit", handleCardFormSubmit);

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
})();
