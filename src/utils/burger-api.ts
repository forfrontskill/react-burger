import {
    TCreatedOrder,
    TFormConfirmResetPassword,
    TFormForgotPassword,
    TFormLogin,
    TFormRegister,
    TLogout,
    TRefreshToken,
    TResponseMenu,
    TToken,
    TUser,
    TUserTokenResponse
} from "../services/types/data";
import { getCookie, setCookie } from "./cookie";

const BASE_URL = process.env.REACT_APP_API_URL;

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
}



export const getIngredients = () => {
    return request<TResponseMenu>(`${BASE_URL}/ingredients`)
}

export const createOrderRequest = (ingredients: string[]) => {
    return request<TCreatedOrder>(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            ...headers,
            authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify({ ingredients })
    })
}

export const loginRequest = (loginForm: TFormLogin) => {
    return request<TUserTokenResponse>(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(loginForm)
    });
};

export const registerRequest = (loginForm: TFormRegister) => {
    return request<TUserTokenResponse>(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(loginForm)
    });
};

export const passwordResetRequest = async (form: TFormForgotPassword) => {
    return await request<typeof form>(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
    });
};

export const passwordResetConfirmRequest = async (form: TFormConfirmResetPassword) => {
    return await request<typeof form>(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
    });
};

export const refreshTokenRequest = () => {
    return request<TRefreshToken>(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ token: getCookie('refreshToken') })
    });
};

export const logoutRequest = (refreshToken: TToken) => {
    return request<TLogout>(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers,
        body: JSON.stringify(refreshToken)
    });
};

export const getUserRequest = () => {
    return request<TUserTokenResponse>(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            ...headers,
            authorization: `Bearer ${getCookie('token')}`
        }
    });
};

export const updateUserRequest = (form: TUser) => {
    return request<TUserTokenResponse>(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            ...headers,
            authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify(form)
    });
};

type TResponseBody<TDataType = {}> = {
    data: TDataType;
    success: boolean;
    message?: string;
    headers?: Headers;
};

interface CustomBody<T extends any> extends Body {
    json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer?: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

type TFuncFetch = <T>(retries: number, url: string, options?: RequestInit) => Promise<CustomResponse<TResponseBody<T>>>;

const request = <T>(url: string, options?: RequestInit): Promise<T> => {
    const requestCallback: TFuncFetch = (retries, url, options) => { return fetch(url, options) };
    return refreshTokenExpired(2, requestCallback, url, options);
}

const refreshTokenExpired = (retries: number = 2, req: TFuncFetch, url: string, options?: RequestInit) => {
    return req(retries, url, options)
        .then(res => {
            if (res.ok) {
                return checkResponse(res);
            }

            if (res.status !== 403 || !retries) {
                throw new Error('Ошибка повторной авторизации');
            }

            return refreshTokenRequest()
                .then((res => {
                    setCookie('refreshToken', res.refreshToken);

                    let authToken = '';
                    if (res.accessToken) {
                        if (res.accessToken.indexOf('Bearer') === 0) {
                            authToken = res.accessToken.split('Bearer ')[1];
                        }
                    }
                    setCookie('token', authToken);
                    return res;
                }))
                .then((res) => {
                    return req(retries - 1, url, options).then(checkResponse);
                })
                .catch((res) => {
                    return Promise.reject(`Ошибка: ${res.status}`);
                })

        })
        .catch((res) => {

        });
}

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}