import Popup from "./popup.js";

export class PopupWithImage extends Popup {
  open(image, text) {
    const imagePopupImage = this._popupSelector.querySelector(".image__popup");
    const imagePopupDecription = this._popupSelector.querySelector(
      ".image__discription"
    );
    imagePopupImage.src = image;
    imagePopupImage.alt = text;
    imagePopupDecription.textContent = text;

    super.open();
  }
}
