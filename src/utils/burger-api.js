const BASE_URL = process.env.REACT_APP_API_URL;

export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}