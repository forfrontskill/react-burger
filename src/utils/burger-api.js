import { getCookie, setCookie } from "./cookie";

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
        headers: {
            ...headers,
            authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify({ ingredients })
    })
}

export const loginRequest = (loginForm) => {
    return request(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(loginForm)
    });
};

export const registerRequest = (loginForm) => {
    return request(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(loginForm)
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

export const refreshTokenRequest = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ token: getCookie('refreshToken') })
    });
};

export const logoutRequest = (refreshToken) => {
    return request(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ token: refreshToken })
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

export const updateUserRequest = (form) => {
    return request(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            ...headers,
            authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify(form)
    });
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const request = (url, options) => {
    const requestCallback = (url, options) => { return fetch(url, options) };
    return refreshTokenExpired(requestCallback, url, options);
}


const refreshTokenExpired = (req, url, options) => {
    return req(url, options)
        .then(checkResponse)
        .catch((res) => {
            return refreshTokenRequest()
                .then(checkResponse)
                .then((res => {
                    setCookie('refreshToken', res.refreshToken);

                    let authToken;
                    if (res.accessToken) {
                        if (res.accessToken.indexOf('Bearer') === 0) {
                            authToken = res.accessToken.split('Bearer ')[1];
                        }
                    }
                    setCookie('token', authToken);

                    return res;
                }))
                .then((res) => {
                    return req(url, options).then(checkResponse);
                })
                .catch((res) => {
                    return Promise.reject(`Ошибка: ${res.status}`);
                })
        });
}