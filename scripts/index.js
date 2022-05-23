//// Imports ////
import {
  closePopup,
  editProfilePopup,
  addCardPopup,
  profileEditButton,
} from "./utils.js";

import { cardContainer, Card } from "./card.js";

import FormValidator from "./formValidator.js";

//// decleratoins /////
(function () {
  ///// Forms ////
  const editForm = document.querySelector(".edit__form");
  const addForm = addCardPopup.querySelector(".add__form");

  //Inputs//
  const nameInput = document.getElementById("name-input");
  const jobInput = document.getElementById("job-input");

  // Const Elements //
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  //// Popup functions////

  /// Form Functions ///

  function fillEditForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    editFormValidator.toggleButtonState();
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

    const newCard = new Card(
      { text: titelInput.value, image: imageInput.value },
      "#card-template"
    );
    const cardElement = newCard.generateCard();
    cardContainer.prepend(cardElement);

    closePopup(addCardPopup);
    addForm.reset();
    addFormValidator.resetValidationError();
  }
  /// New Card Handler ///

  /// Edit Profile From ///

  profileEditButton.addEventListener("click", fillEditForm);

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
