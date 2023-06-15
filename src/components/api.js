const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
        'content-type': 'application/json',
        authorization: 'c9ee1440-7613-4065-959f-2ee974e55dba',
    } 
}

function onResponse(res) {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

export function getInfoAboutUser(){
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me ', {
        method: 'GET',
        headers: {
          authorization: 'c9ee1440-7613-4065-959f-2ee974e55dba'
        }
      })
      .then(onResponse)
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(onResponse)
}

export function getFulfilledRequests() {
    return Promise.all([getInfoAboutUser(), getCards()])
}

export function addCard(body) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function editProfile(body) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function editAvatar(body) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then(onResponse)
}

export function deleteCard(idCard) {
    return fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(onResponse)
}

export function putLike(idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(onResponse)
}

export function removeLike(idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(onResponse)
}

