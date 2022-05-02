/// Input Error Functions ///

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

export default function resetValidationError(formElement) {
  const errorElements = Array.from(
    formElement.querySelectorAll(`.form__input-error`)
  );
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  const buttonElement = formElement.querySelector(".form__button");

  errorElements.forEach((errorElement) => {
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
  });

  inputList.forEach((inputElement) => {
    inputElement.classList.remove("form__input_type_error");
  });

  buttonElement.classList.remove("form__button_disabled");
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
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__button_disabled");
    buttonElement.disabled = false;
  }
};

/// Lists ///
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

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
