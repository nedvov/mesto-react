class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    #isOK (res) {
        const status = res.ok
        const statusMessage = res.status
        return res.json()
        .then((data) => {
            if (!status) {
                return Promise.reject(`Ошибка: ${statusMessage}; ${data.message}`)
            }
            return data 
        })
    }
  
    async getInitialCards() {
        return  fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
              authorization: this._headers.authorization
            }            
        })
        .then(res => this.#isOK(res))
    }

    async getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
              authorization: this._headers.authorization
            }            
        })
        .then(res => this.#isOK(res))
    }

    async addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._headers.authorization,
              'Content-Type': this._headers['Content-Type']
            },
            body: JSON.stringify({
                'name': name,
                'link': link
            })          
        })
        .then(res => this.#isOK(res)) 
    }

    async setUserInfo(name, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._headers.authorization,
              'Content-Type': this._headers['Content-Type']
            },
            body: JSON.stringify({
                'name': name,
                'about': job
            })          
        })
        .then(res => this.#isOK(res))
    }

    async deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: this._headers.authorization
            }       
        })
        .then(res => {
            if (res.ok) {
              return res;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    async likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
              authorization: this._headers.authorization,
              'Content-Type': this._headers['Content-Type']
            }        
        })
        .then(res => this.#isOK(res))
    }

    async dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
              authorization: this._headers.authorization,
              'Content-Type': this._headers['Content-Type']
            }        
        })
        .then(res => this.#isOK(res))
    }

    async setUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._headers.authorization,
              'Content-Type': this._headers['Content-Type']
            },
            body: JSON.stringify({
                'avatar': link
            })          
        })
        .then(res => this.#isOK(res))
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
      authorization: 'bd312182-f682-4611-bb11-842bf508484e',
      'Content-Type': 'application/json'
    }
  });