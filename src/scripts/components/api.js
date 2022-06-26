export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(profileName, profileJob, avatarImage) {
    fetch(this._baseUrl, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Something went wrong: ${res.status}`);
        }
      })

      .then((user) => {
        profileName.textContent = user.name;
        profileJob.textContent = user.about;
        avatarImage.src = user.avatar;
      })

      .catch((err) => {
        console.log(err);
      });
  }

  sendUserInfo(inputValues) {
    fetch(this._baseUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.job,
      }),
    });
  }

  getInitialCards(section, cardContainer, createCard) {
    fetch(this._baseUrl, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Something went wrong: ${res.status}`);
        }
      })

      .then((initialCards) => {
        const cardsList = new section(
          {
            data: initialCards,
            renderer: (item) => {
              const cardElement = createCard(item);

              cardsList.addItem(cardElement);
            },
          },
          cardContainer
        );

        cardsList.renderItems();
      })

      .catch((err) => {
        console.log(err);
      });
  }

  sendNewCard(inputValues) {
    fetch(this._baseUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.title,
        link: inputValues.image,
      }),
    });
  }
}
