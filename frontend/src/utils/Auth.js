class Auth {
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

    registrate(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(this._checkStatus);
    }

    autorize(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(this._checkStatus);
    }

    getToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkStatus);
    }
}

const auth = new Auth(
    {
        baseUrl: "https://api.shmakov.students.nomoreparties.sbs",
        headers: {
            "Content-Type": "application/json",
        },
    }
);

export default auth;