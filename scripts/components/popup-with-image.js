import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._image = data.image;
    this._text = data.text;
  }

  open() {
    const imagePopupImage = imagePopup.querySelector(".image__popup");
    const imagePopupDecription = imagePopup.querySelector(
      ".image__discription"
    );
    imagePopupImage.src = this._image;
    imagePopupImage.alt = this._text;
    imagePopupDecription.textContent = this._text;

    super.open();
  }
}
