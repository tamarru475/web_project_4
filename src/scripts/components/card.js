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
    this._owner = data.owner;
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
    const trashButton = this._element.querySelector(
      ".gallery__card-trash-button"
    );

    cardImage.style.backgroundImage = `url(${this._image})`;
    cardTitle.textContent = this._text;
    likeCounter.textContent = this._likes.length;

    if (this._owner._id !== this._userId) {
      trashButton.classList.remove("gallery__card-trash-button_active");
    }

    this._renderLikes();

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

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  _renderLikes() {
    const likeButton = this._element.querySelector(
      ".gallery__card-like_button"
    );
    const likeCounter = this._element.querySelector(
      ".gallery__card-like_counter"
    );
    likeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      likeButton.classList.add("gallery__card-like_button_active");
    } else {
      likeButton.classList.remove("gallery__card-like_button_active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
