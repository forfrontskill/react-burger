import { getCookie } from "./cookie";

const BASE_URL = process.env.REACT_APP_API_URL;

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}

export const getIngredients = () => {
    return request(`${BASE_URL}/ingredients`)
}

export const createOrderRequest = (ingredients) => {
    return request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ingredients })
    })
}

const form = {
    email: "test@requests.ru",
    password: "testRequests"
}

const formRegister = {
    email: "test@requests1.ru",
    password: "testRequests",
    name: "RequestApiName1"
}

export const loginRequest = (loginForm) => {
    return request(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
    });
};

export const registerRequest = (loginForm) => {
    return request(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formRegister)
    });
};

export const passwordResetRequest = async (form) => {
    return await request(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
    });
};

export const passwordResetConfirmRequest = async (form) => {
    return await request(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
    });
};

export const refreshTokenRequest = (refreshToken) => {
    return request(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers,
        body: JSON.stringify({token: refreshToken})
    });
};

export const logoutRequest = (refreshToken) => {
    return request(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({token: refreshToken})
    });
};

export const getUserRequest = () => {
    return request(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            ...headers,
            authorization: `Bearer ${getCookie('token')}`
        }
    });
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
}