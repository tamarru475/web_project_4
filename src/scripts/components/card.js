/// Classes ///

export default class Card {
  constructor(
    { data, handleImageClick, handleTrashClick, handleLikeClick },
    cardSelector,
    userId
  ) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._userId = userId;

    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
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
    const likeCounter = this._element.querySelector(
      ".gallery__card-like_counter"
    );

    cardImage.style.backgroundImage = `url(${this._image})`;
    cardTitle.textContent = this._text;
    likeCounter.textContent = this._likes.length;

    const isLiked = this._likes.some((person) => person._id === this._userId);

    if (isLiked) {
      this.likeCard(this._likes);
    }

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

    likeButton.addEventListener("click", () => this._handleLikeClick(this._id));

    trashButton.addEventListener("click", () =>
      this._handleTrashClick(this._id)
    );
  }

  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }

  likeCard(newLikes) {
    this._likes = newLikes;
    const likeButton = this._element.querySelector(
      ".gallery__card-like_button"
    );
    const likeCounter = this._element.querySelector(
      ".gallery__card-like_counter"
    );

    likeCounter.textContent = this._likes.length;

    likeButton.classList.toggle("gallery__card-like_button_active");
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
