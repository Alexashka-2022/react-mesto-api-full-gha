class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options)
            .then(this._checkStatus);
    }

    setToken(token) {
        this._headers.authorization = `Bearer ${token}`;
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`,
            {
                method: "GET",
                headers: this._headers,
            })
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`,
            {
                method: "GET",
                headers: this._headers,
            })
    }

    editUserAvatar(userAvatar) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar,
            }),
        })
    }

    editUserInfo(userName, userAbout) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })

    }

    addNewCard(cardName, cardLink) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
    }

    addLike(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    deleteLike(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }
}

const api = new Api(
    {
        baseUrl: "https://api.shmakov.students.nomoreparties.sbs",
        headers: {
            "content-type": "application/json",
            "authorization": ""
        },
    });

export default api;