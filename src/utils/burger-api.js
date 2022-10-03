const BASE_URL = process.env.REACT_APP_API_URL;

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
}

export const createOrder = (ingredients) => {
    return fetch(`${BASE_URL}/orders`,{
        method: 'POST',
        headers,
        body: JSON.stringify({ ingredients }) 
    })
    .then(checkResponse);
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}