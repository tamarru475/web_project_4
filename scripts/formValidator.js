/// Class ///
class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._element = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._element.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  resetValidationError() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );

    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._element.querySelector(
      this._submitButtonSelector
    );
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );

    this._element.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._element.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
