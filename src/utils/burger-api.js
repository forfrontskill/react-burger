const BASE_URL = process.env.REACT_APP_API_URL;

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

export const getIngredients = () => {
    return request(`${BASE_URL}/ingredients`)
}

export const createOrder = (ingredients) => {
    return request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ingredients })
    })
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}