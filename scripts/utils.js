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

/// Export ///
export { openPopup, closePopup };
