///// popups////
const editProfilePopup = document.querySelector(".edit");
const addCardPopup = document.querySelector(".add");
const imagePopup = document.querySelector(".image");

/////buttons///
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = editProfilePopup.querySelector(
  ".edit__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const cardPopupCloseButton = addCardPopup.querySelector(".add__close-button");
const imagePopupCloseButton = imagePopup.querySelector(".image__close-button");

//// Popup functions////
function openPopup(popupModel) {
  popupModel.classList.add("popup_fadein");
  document.addEventListener("keydown", closePopupWhenEsc);
  popupModel.addEventListener("mousedown", closePopupWhenLayover);
  if (popupModel.classList.contains("popup_fadeout")) {
    popupModel.classList.remove("popup_fadeout");
  }
}

function closePopup(popupModel) {
  popupModel.classList.add("popup_fadeout");
  document.removeEventListener("keydown", closePopupWhenEsc);
  popupModel.removeEventListener("mousedown", closePopupWhenLayover);
  if (popupModel.classList.contains("popup_fadein")) {
    popupModel.classList.remove("popup_fadein");
  }
}

function closePopupWhenLayover(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupWhenEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_fadein");
    closePopup(openedPopup);
  }
}

/////event listeners/////

/// Edit Profile Popup ///

profileEditButton.addEventListener("click", () => openPopup(editProfilePopup));

profilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);

/// Add Card Popup ///

profileAddButton.addEventListener("click", () => openPopup(addCardPopup));

cardPopupCloseButton.addEventListener("click", () => closePopup(addCardPopup));

/// Image Popup ///

imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));

/// Export ///
export {
  openPopup,
  closePopup,
  imagePopup,
  editProfilePopup,
  addCardPopup,
  profileEditButton,
  cardPopupCloseButton,
  imagePopupCloseButton,
};
