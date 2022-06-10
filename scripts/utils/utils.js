//// Popup functions////
function openPopup(popupModel) {
  popupModel.classList.add("popup_fadein");
  document.addEventListener("keydown", closePopupWhenEsc);
  popupModel.addEventListener("mousedown", closePopupWhenLayover);
}

function closePopup(popupModel) {
  popupModel.classList.remove("popup_fadein");
  document.removeEventListener("keydown", closePopupWhenEsc);
  popupModel.removeEventListener("mousedown", closePopupWhenLayover);
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

/// Export ///
export { openPopup, closePopup };
