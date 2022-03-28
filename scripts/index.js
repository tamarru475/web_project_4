let popup = document.querySelector(".popup");
let profileEditbutton = document.querySelector(".profile__edit-button");
let popupClosebutton = popup.querySelector(".popup__close-button");
let popupForm = document.querySelector(".popup__form ");

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

  let nameInput = document.getElementById("name");

  let jobInput = document.getElementById("job");

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__name-discription");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.remove("popup__open");
}

popupForm.addEventListener("submit", handleProfileFormSubmit);
