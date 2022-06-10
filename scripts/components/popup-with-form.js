import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = popupSelector.querySelector(".form");
  }

  _getInputValues() {
    this._inputList = this._formSelector.querySelectorAll("form__input");

    this.formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._formSelector.addEventListener("click", this._handleFormSubmit());
  }

  handleClosePopup() {
    super.close();

    this._formSelector.reset();
  }
}
