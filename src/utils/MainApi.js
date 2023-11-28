import { beatfilm_URL } from '../utils/const';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/movies`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserData(token) {
    return this._request(this._userUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  saveUserChanges(name, email, token) {
    return this._request(this._userUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
  }

  getSavedMovies(token) {
    return this._request(this._cardsUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  addMovie( card, token) {
  return this._request(this._cardsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `${beatfilm_URL}${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: `${beatfilm_URL}${card.image.url}`,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN
    }),
  })
}

  removeMovie(cardId, token) {
    return this._request(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  registration (name, email, password)  {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password })
    })
  };

  login (email, password)  {
    return this._request(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password })
    })
  };

  checkToken (token)  {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  };
}

const mainApi = new MainApi({
  baseUrl:  'http://localhost:3000', //'https://api.diplom.eysaveleva.nomoredomainsrocks.ru', //
});

export default mainApi;
