import Popup from "./popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handleButtonClick) {
    super(popupSelector);
    this._handleButtonClick = handleButtonClick;
    this._button = popupSelector.querySelector(".button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener("click", () => this._handleButtonClick());
  }
}
