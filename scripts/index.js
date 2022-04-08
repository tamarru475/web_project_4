const main = document.querySelector(".main");
const editPopup = document.querySelector(".edit__popup");
const profileEditbutton = document.querySelector(".profile__edit-button");
const editPopupClosebutton = editPopup.querySelector(
  ".edit__popup-close_button"
);
const editForm = document.querySelector(".edit__form");
const profileAddButton = document.querySelector(".profile__add-button");
const addPopupTemplate = document.querySelector("#add__popup-template").content;
const addPopup = addPopupTemplate.querySelector(".add__popup").cloneNode(true);
const addPopupButton = addPopup.querySelector(".add__popup-close_button");
const addForm = addPopup.querySelector(".add__form");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function openEditPopup() {
  editPopup.classList.add("edit__popup_active");

  const nameInput = document.getElementById("name");

  const jobInput = document.getElementById("job");

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeEditPopup() {
  editPopup.classList.remove("edit__popup_active");
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.getElementById("name");

  const jobInput = document.getElementById("job");

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editPopup.classList.remove("edit__popup_active");
}

function openAddPopup() {
  main.append(addPopup);
}

function closeAddPopup() {
  addPopup.remove();
}

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const titelInput = document.getElementById("title");
  const imageInput = document.getElementById("image-link");

  initialCards.unshift({ name: titelInput.value, link: imageInput.value });
  console.log(initialCards);

  addPopup.remove();
}

profileEditbutton.addEventListener("click", openEditPopup);

profileAddButton.addEventListener("click", openAddPopup);

editPopupClosebutton.addEventListener("click", closeEditPopup);

addPopupButton.addEventListener("click", closeAddPopup);

editForm.addEventListener("submit", handleProfileEditFormSubmit);

addForm.addEventListener("submit", handleProfileAddFormSubmit);
