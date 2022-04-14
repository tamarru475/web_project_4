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
const editPopup = document.querySelector(".edit");
const editForm = document.querySelector(".editform");
const addPopup = document.querySelector(".add");
const addForm = addPopup.querySelector(".addform");
const imagePopup = document.querySelector(".image");

/////buttons///
const profileEditbutton = document.querySelector(".profile__edit-button");
const editPopupClosebutton = editPopup.querySelector(".edit__close-button");
const profileAddButton = document.querySelector(".profile__add-button");
const addPopupButton = addPopup.querySelector(".add__close-button");
const imagePopupCloseButton = imagePopup.querySelector(".image__close-button");

//wrappers///

const cardContainer = document.querySelector(".gallery__container");

////functions////

function openEditPopup() {
  editPopup.classList.add("edit__popup_fadein");
  editPopup.classList.remove("edit__popup_fadeout");

  const nameInput = document.getElementById("name");

  const jobInput = document.getElementById("job");

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeEditPopup() {
  editPopup.classList.add("edit__popup_fadeout");
  editPopup.classList.remove("edit__popup_fadein");
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.getElementById("name");

  const jobInput = document.getElementById("job");

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editPopup.classList.add("edit__popup_fadeout");
  editPopup.classList.remove("edit__popup_fadein");
}

function openAddPopup() {
  addPopup.classList.add("add__popup_fadein");
  addPopup.classList.remove("add__popup_fadeout");
}

function closeAddPopup() {
  addPopup.classList.add("add__popup_fadeout");
  addPopup.classList.remove("add__popup_fadein");
}

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".gallery__card");
  const cardElement = cardTemplate.cloneNode(true);

  const titelInput = document.getElementById("title");
  const imageInput = document.getElementById("image-link");
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-place");

  cardTitle.textContent = titelInput.value;
  cardImage.style.backgroundImage = `url(${imageInput.value})`;

  cardContainer.prepend(cardElement);

  addPopup.classList.add("add__popup_fadeout");
  addPopup.classList.remove("add__popup_fadein");

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

  cardImage.addEventListener("click", function () {
    const imagePopupImage = imagePopup.querySelector(".image__popup");
    const imagePopupDidcription = imagePopup.querySelector(
      ".image__discription"
    );
    imagePopupImage.src = imageInput.value;
    imagePopupDidcription.textContent = titelInput.value;

    imagePopup.classList.add("image__popup_fadein");
    imagePopup.classList.remove("image__popup_fadeout");
  });
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
  const imagePopupImage = imagePopup.querySelector(".image__popup");
  const imagePopupDidcription = imagePopup.querySelector(".image__discription");
  imagePopupImage.src = card.link;
  imagePopupDidcription.textContent = card.name;

  imagePopup.classList.add("image__popup_fadein");
  imagePopup.classList.remove("image__popup_fadeout");
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
  imagePopup.classList.add("image__popup_fadeout");
  imagePopup.classList.remove("image__popup_fadein");
});

///const removeCard = (card) => {};

///template////

initialCards.forEach((card) => renderCard(card, cardContainer));
