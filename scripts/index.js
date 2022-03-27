let popup = document.querySelector(".popup");
let profileEditbutton = document.querySelector(".profile__edit-button");
let popupClosebutton = popup.querySelector(".popup__close-button");
let formSavebutton = popup.querySelector(".form__button");

function openPopup() {
  popup.classList.add("popup__open");
}

profileEditbutton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup__open");
}

popupClosebutton.addEventListener("click", closePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".form__input-name");
  let jobInput = document.querySelector(".form__input-job");

  let profileName = document.querySelector(".profile__name").value;
  let profileJob = document.querySelector(".profile__name-discription").value;

  profileName.textContent = val(nameInput);
  profileJob.textContent = val(jobInput);
}

formSavebutton.addEventListener("submit", handleProfileFormSubmit);
