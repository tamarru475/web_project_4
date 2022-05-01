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

///// popups////
const editProfilePopup = document.querySelector(".edit");
const editForm = document.querySelector(".edit__form");
const addCardPopup = document.querySelector(".add");
const addForm = addCardPopup.querySelector(".add__form");
const imagePopup = document.querySelector(".image");

/////buttons///
const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = editProfilePopup.querySelector(
  ".edit__close-button"
);
const profileAddButton = document.querySelector(".profile__add-button");
const cardPopupCloseButton = addCardPopup.querySelector(".add__close-button");
const imagePopupCloseButton = imagePopup.querySelector(".image__close-button");
const formButton = document.querySelector(".form__button");

//wrappers///

const cardContainer = document.querySelector(".gallery__container");

//inputs//

const nameInput = document.getElementById("name-input");
const jobInput = document.getElementById("job-input");

////functions////

function togglePopup(modelPopup) {
  if (modelPopup.classList.contains("popup_fadein")) {
    modelPopup.classList.toggle("popup_fadeout");
  } else {
    modelPopup.classList.toggle("popup_fadein");
  }
}

function fillProfileForm() {
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__name-discription");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  togglePopup(editProfilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const titelInput = document.getElementById("title-input");
  const imageInput = document.getElementById("imagelink-input");

  cardContainer.prepend(
    createCardElement({ name: titelInput.value, link: imageInput.value })
  );

  togglePopup(addCardPopup);
  addForm.reset();
}

function createCardElement(card) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".gallery__card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-place");

  cardImage.style.backgroundImage = `url(${card.link})`;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => openImagePreview(card));

  const likeButton = cardElement.querySelector(".gallery__card-like_button");
  const trashButton = cardElement.querySelector(".gallery__card-trash-button");

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("gallery__card-like_button_active");
  });

  trashButton.addEventListener("click", function () {
    cardElement.remove(cardElement);
  });

  return cardElement;
}

const openImagePreview = (card) => {
  const imagePopupImage = imagePopup.querySelector(".image__popup");
  const imagePopupDidcription = imagePopup.querySelector(".image__discription");
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  imagePopupDidcription.textContent = card.name;

  togglePopup(imagePopup);
};

function renderCard(card, wrraper) {
  wrraper.append(createCardElement(card));
}

function closePopup(popupModel) {
  popupModel.classList.add("popup_fadeout");
}

const closePopupWhenLayover = (popupModel) => {
  popupModel.addEventListener("mousedown", function (evt) {
    const isClosest = evt.target.closest(".popup__container");

    if (!isClosest && popupModel.classList.contains("popup_fadein")) {
      closePopup(popupModel);
    }
  });
};

/////event listeners/////

/// Edit Profile Popup ///

profileEditButton.addEventListener("click", () =>
  togglePopup(editProfilePopup)
);

profileEditButton.addEventListener("click", fillProfileForm);

profilePopupCloseButton.addEventListener("click", () =>
  togglePopup(editProfilePopup)
);

editForm.addEventListener("submit", handleProfileEditFormSubmit);

closePopupWhenLayover(editProfilePopup);

/// Add Card Popup ///

profileAddButton.addEventListener("click", () => togglePopup(addCardPopup));

cardPopupCloseButton.addEventListener("click", () => togglePopup(addCardPopup));

addForm.addEventListener("submit", handleCardFormSubmit);

closePopupWhenLayover(addCardPopup);

/// Image Popup ///

imagePopupCloseButton.addEventListener("click", () => togglePopup(imagePopup));

closePopupWhenLayover(imagePopup);

/// General ///

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(editProfilePopup);
    closePopup(addCardPopup);
    closePopup(imagePopup);
  }
});

///const removeCard = (card) => {};

///template////

initialCards.forEach((card) => renderCard(card, cardContainer));
