import {
  imagePopup,
  openPopup,
  closePopup,
  imagePopupCloseButton,
} from "./utils.js";

/// arays ///
const initialCards = [
  {
    text: "Yosemite Valley",
    image: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    text: "Lake Louise",
    image: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    text: "Bald Mountains",
    image: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    text: "Latemar",
    image: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    text: "Vanoise National Park",
    image: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    text: "Lago di Braies",
    image: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/// Consts ///
export const cardContainer = document.querySelector(".gallery__container");
/// Classes ///
class Card {
  constructor(data, cardSelector) {
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card");
    const cardElement = cardTemplate.cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".gallery__card-image");
    const cardTitle = this._element.querySelector(".gallery__card-place");

    cardImage.style.backgroundImage = `url(${this._image})`;
    cardTitle.textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(
      ".gallery__card-like_button"
    );
    const trashButton = this._element.querySelector(
      ".gallery__card-trash-button"
    );
    const cardImage = this._element.querySelector(".gallery__card-image");

    cardImage.addEventListener("click", () => {
      this._openImagePreview();
    });

    imagePopupCloseButton.addEventListener("click", () => {
      this._closeImagePreview();
    });

    likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("gallery__card-like_button_active");
    });

    trashButton.addEventListener("click", () => {
      this._handleTrashClick();
    });
  }

  _handleTrashClick() {
    this._element.remove(this._element);
  }

  _openImagePreview() {
    const imagePopupImage = imagePopup.querySelector(".image__popup");
    const imagePopupDecription = imagePopup.querySelector(
      ".image__discription"
    );
    imagePopupImage.src = this._image;
    imagePopupImage.alt = this._text;
    imagePopupDecription.textContent = this._text;

    openPopup(imagePopup);
  }

  _closeImagePreview() {
    closePopup(imagePopup);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");

  const cardElement = card.generateCard();

  cardContainer.append(cardElement);
});
