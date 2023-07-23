class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserData(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addCard({ title, link }, jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardID, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeCardStatus(cardID, isLiked, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeUserData({ name, about }, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateAvatar({ avatar }, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  baseUrl: "http://158.160.54.178:3000",
  //baseUrl: "http://127.0.0.1:3000",
  headers: {
    //'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});

export default api;
