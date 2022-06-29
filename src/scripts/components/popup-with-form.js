import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = popupSelector.querySelector(".form");
    this._submitButton = popupSelector.querySelector(".form__button");
  }

  _getInputValues() {
    const inputList = Array.from(
      this._formSelector.querySelectorAll(".form__input")
    );

    const inputValues = {};

    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formSelector.addEventListener("submit", () =>
      this._handleFormSubmit(this._getInputValues())
    );
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      if (this._submitButton.classList.contains("form__button-create")) {
        this._submitButton.textContent = "Create";
      } else {
        this._submitButton.textContent = "Save";
      }
    }
  }
}
