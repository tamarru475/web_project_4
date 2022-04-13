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
const imagePopup = document.querySelector(".image__popup");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".gallery__card");
const cardElement = cardTemplate.cloneNode(true);
const gallery = document.querySelector(".gallery");

/////buttons///
const profileEditbutton = document.querySelector(".profile__edit-button");
const editPopupClosebutton = editPopup.querySelector(
  ".edit__popup-close_button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const addPopupButton = addPopup.querySelector(".add__popup-close_button");
const likeButton = cardElement.querySelector(".gallery__card-like_button");
const imagePopupCloseButton = imagePopup.querySelector(
  ".image__popup-close_button"
);

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

  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".gallery__card");
  const cardElement = cardTemplate.cloneNode(true);

  const titelInput = document.getElementById("title");
  const imageInput = document.getElementById("image-link");
  const cardPhoto = cardElement.querySelector(".gallery__card-image");
  const cardName = cardElement.querySelector(".gallery__card-place");

  cardName.textContent = titelInput.value;
  cardPhoto.style.backgroundImage = `url(${imageInput.value})`;

  cardContainer.prepend(cardElement);

  addPopup.classList.remove("add__popup_active");

  cardElement
    .querySelector(".gallery__card-like_button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__card-like_button_active");
    });

  cardElement
    .querySelector(".gallery__card-trash-button")
    .addEventListener("click", function () {
      cardElement.remove(cardElement);
    });

  cardImage.addEventListener("click", () => imagePreview(card));
}

function creatCardElement(card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".gallery__card");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-place");

  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => imagePreview(card));

  cardElement
    .querySelector(".gallery__card-like_button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__card-like_button_active");
    });

  cardElement
    .querySelector(".gallery__card-trash-button")
    .addEventListener("click", function () {
      cardElement.remove(cardElement);
    });

  return cardElement;
}

const imagePreview = (card) => {
  const imagePopupImage = imagePopup.querySelector(".image__popup-image");
  const imagePopupDidcription = imagePopup.querySelector(
    ".image__popup-discription"
  );
  imagePopupImage.src = card.link;
  imagePopupDidcription.textContent = card.name;

  imagePopup.classList.add("image__popup_active");
};

function renderCard(card, wrraper) {
  wrraper.append(creatCardElement(card));
}

/////event listeners/////

profileEditbutton.addEventListener("click", openEditPopup);

profileAddButton.addEventListener("click", openAddPopup);

editPopupClosebutton.addEventListener("click", closeEditPopup);

addPopupButton.addEventListener("click", closeAddPopup);

editForm.addEventListener("submit", handleProfileEditFormSubmit);

addForm.addEventListener("submit", handleProfileAddFormSubmit);

imagePopupCloseButton.addEventListener("click", function () {
  imagePopup.classList.remove("image__popup_active");
});

///const removeCard = (card) => {};

///template////

initialCards.forEach((card) => renderCard(card, cardContainer));
