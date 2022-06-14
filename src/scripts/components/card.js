/// Classes ///
import { imagePopupModle } from "./popup-with-image.js";

export class Card {
  constructor(data, cardSelector, clickImageHandler) {
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector;

    this._clickImageHandler = clickImageHandler;
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

    cardImage.addEventListener("click", () => this._clickImageHandler());

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
}

export function createCard(cardData) {
  const card = new Card(cardData, "#card-template", () => {
    imagePopupModle.open(cardData.image, cardData.text);
    imagePopupModle.setEventListeners();
  });
  return card.generateCard();
}
