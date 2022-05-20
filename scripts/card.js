(function () {
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
        openImagePreview(this._element);
      });

      likeButton.addEventListener("click", () => {
        this._handleLikeClick();
      });

      trashButton.addEventListener("click", () => {
        this._handleTrashClick();
      });
    }

    _handleLikeClick(evt) {
      evt.target.classList.toggle("gallery__card-like_button_active");
    }

    _handleTrashClick() {
      this._element.remove(this._element);
    }
  }

  initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");

    const cardElement = card.generateCard();

    cardContainer.append(cardElement);
  });
})();
