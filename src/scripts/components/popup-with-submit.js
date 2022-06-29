import Popup from "./popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = popupSelector.querySelector(".form");
    this._submitButton = popupSelector.querySelector(".delete__button");
  }

  setAction(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitHandler();
    });

    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }
}
