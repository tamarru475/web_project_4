export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_fadein");
    document.addEventListener("keydown", this._closePopupWhenEsc);
    this._popupSelector.addEventListener(
      "mousedown",
      this._closePopupWhenLayover
    );
  }

  close() {
    this._popupSelector.classList.remove("popup_fadein");
    document.removeEventListener("keydown", this._closePopupWhenEsc);
    this._popupSelector.removeEventListener(
      "mousedown",
      this._closePopupWhenLayover
    );
  }

  _closePopupWhenLayover(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
    }
  }

  _closePopupWhenEsc(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_fadein");
      this.close;
    }
  }

  setEventListeners() {
    const closeButton = this._popupSelector.querySelector(".close-button");

    closeButton.addEventListener("click", this.close);
  }
}
