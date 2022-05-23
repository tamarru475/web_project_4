import { openPopup } from "./utils.js";

/// Consts ///
export const cardContainer = document.querySelector(".gallery__container");
export const imagePopup = document.querySelector(".image");
/// Classes ///
export class Card {
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

    likeButton.addEventListener("click", this._handleLikeClick);

    trashButton.addEventListener("click", this._handleTrashClick);
  }

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle("gallery__card-like_button_active");
  };

  _handleTrashClick = () => {
    this._element.remove();
    this._element = null;
  };

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
}

export function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.generateCard();
}
