import Popup from "./popup.js";

import { imagePopup } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

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

export const imagePopupModle = new PopupWithImage(imagePopup);
