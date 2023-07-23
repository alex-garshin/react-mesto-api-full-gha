class Auth {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    register({ email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    authorize({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }
}

//const auth = new Auth('http://127.0.0.1:3000');
const auth = new Auth('http://158.160.54.178:3000');

export default auth;