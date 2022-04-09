//// decleratoins /////

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

///// models////
const editPopup = document.querySelector(".edit__popup");
const editForm = document.querySelector(".edit__form");
const addPopup = document.querySelector(".add__popup");
const addForm = addPopup.querySelector(".add__form");

/////buttons///
const profileEditbutton = document.querySelector(".profile__edit-button");
const editPopupClosebutton = editPopup.querySelector(
  ".edit__popup-close_button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const addPopupButton = addPopup.querySelector(".add__popup-close_button");

//wrappers///

const cardContainer = document.querySelector(".gallery__container");

////functions////

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
  addPopup.classList.add("add__popup_active");
}

function closeAddPopup() {
  addPopup.classList.remove("add__popup_active");
}

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const titelInput = document.getElementById("title");
  const imageInput = document.getElementById("image-link");

  initialCards.unshift({ name: titelInput.value, link: imageInput.value });
  console.log(initialCards);

  addPopup.classList.remove("add__popup_active");
}

/////event listeners/////

profileEditbutton.addEventListener("click", openEditPopup);

profileAddButton.addEventListener("click", openAddPopup);

editPopupClosebutton.addEventListener("click", closeEditPopup);

addPopupButton.addEventListener("click", closeAddPopup);

editForm.addEventListener("submit", handleProfileEditFormSubmit);

addForm.addEventListener("submit", handleProfileAddFormSubmit);

///template////

initialCards.forEach((card) => {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".gallery__card");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-place");

  cardImage.src = `url(${card})`;
  cardTitle.textContent = card.name;

  cardContainer.append(cardElement);
});
