export default class Api {
  constructor(url) {
    this._baseUrl = url
    this._headers = {'Content-Type': 'application/json'}
  }

  _validateQuery(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`);
  }

  _processQuery(path, method, body = null) {
    const options = {
      headers: this._headers,
      method: method,
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${path}`, options)
      .then((res) => this._validateQuery(res))
  }
}
