/// Classes ///

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
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

    cardImage.addEventListener("click", () => this._handleImageClick());

    likeButton.addEventListener("click", this._handleLikeClick);

    trashButton.addEventListener("click", this._handleTrashClick);
  }

  _handleLikeClick = (evt) => {
    const likeCounter = this._element.querySelector(
      ".gallery__card-like_counter"
    );

    evt.target.classList.toggle("gallery__card-like_button_active");

    if (evt.target.classList.contains("gallery__card-like_button_active")) {
      this._likes.push(1);
    } else {
      this._likes.pop();
    }

    let sum = 0;

    for (let i = 0; i < this._likes.length; i++) {
      sum += this._likes[i];
    }

    if (sum === 0) {
      likeCounter.textContent = "";
    } else {
      likeCounter.textContent = sum;
    }
  };

  _handleTrashClick = () => {
    this._element.remove();
    this._element = null;
  };
}
