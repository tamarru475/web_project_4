import Popup from "./popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSelector = popupSelector.querySelector(".form");
  }

  setAction(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitHandler();

      this.close();
    });

    super.setEventListeners();
  }
}
