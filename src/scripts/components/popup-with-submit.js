import Popup from "./popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = popupSelector.querySelector(".form");
    this._submitButton = popupSelector.querySelector(".button__submit");
    this._text = this._submitButton.textContent;
  }

  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit();
    });

    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._text;
    }
  }
}
