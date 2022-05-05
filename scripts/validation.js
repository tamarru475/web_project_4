const configurations = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

/// Input Error Functions ///

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(configurations.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configurations.errorClass);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(configurations.inputErrorClass);
  errorElement.classList.remove(configurations.errorClass);
  errorElement.textContent = "";
};

export function resetValidationError(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(configurations.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    configurations.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
}

/// Input Validator ///
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/// Buttons State Handler ///
export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configurations.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(configurations.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

/// Lists ///
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configurations.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configurations.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(configurations.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

/// Calls ///

enableValidation();

/// exports ///
