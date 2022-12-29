import { getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest } from "../../utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
    LOGIN_RQUEST,
    LOGIN_RQUEST_FAILED,
    LOGIN_RQUEST_FINISH,
    LOGIN_RQUEST_SUCCESS,
    REGISTER_RQUEST,
    REGISTER_RQUEST_FINISH,
    REGISTER_RQUEST_SUCCESS,
    REGISTER_RQUEST_FAILED,
    LOGOUT_RQUEST,
    LOGOUT_RQUEST_FINISH,
    LOGOUT_RQUEST_SUCCESS,
    LOGOUT_RQUEST_FAILED,
    REFRESH_TOKEN_RQUEST,
    REFRESH_TOKEN_RQUEST_FINISH,
    REFRESH_TOKEN_RQUEST_SUCCESS,
    REFRESH_TOKEN_RQUEST_FAILED,
    GET_USER_RQUEST,
    GET_USER_RQUEST_FINISH,
    GET_USER_RQUEST_SUCCESS,
    GET_USER_RQUEST_FAILED,
    UPDATE_USER_RQUEST,
    UPDATE_USER_RQUEST_FAILED,
    UPDATE_USER_RQUEST_FINISH,
    UPDATE_USER_RQUEST_SUCCESS
} from "../constants/user";
import { TUser } from "../types/data";

interface ILoginRequestAction {
    readonly type: typeof LOGIN_RQUEST;
};

interface ILoginRequestFailedAction {
    readonly type: typeof LOGIN_RQUEST_FAILED;
    readonly err: string;
};

interface ILoginRequestFinishAction {
    readonly type: typeof LOGIN_RQUEST_FINISH;
};

interface ILoginRequestSuccessAction {
    readonly type: typeof LOGIN_RQUEST_SUCCESS;
    readonly user: TUser;
};

interface IRegisterRequestAction {
    readonly type: typeof REGISTER_RQUEST;
};

interface IRegisterRequestFinishAction {
    readonly type: typeof REGISTER_RQUEST_FINISH;
};

interface IRegisterRequestSuccessAction {
    readonly type: typeof REGISTER_RQUEST_SUCCESS;
    readonly user: TUser;
};

interface IRegisterRequestFailedAction {
    readonly type: typeof REGISTER_RQUEST_FAILED;
    readonly err: string;
};

interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_RQUEST;
};

interface ILogoutRequestFinishAction {
    readonly type: typeof LOGOUT_RQUEST_FINISH;
};

interface ILogoutRequestSuccessAction {
    readonly type: typeof LOGOUT_RQUEST_SUCCESS;
    readonly user: TUser;
};

interface ILogoutRequestFailedAction {
    readonly type: typeof LOGOUT_RQUEST_FAILED;
    readonly err: string;
};

interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_RQUEST;
};

interface IRefreshTokenRequestFinishAction {
    readonly type: typeof REFRESH_TOKEN_RQUEST_FINISH;
};

interface IRefreshTokenRequestSuccessAction {
    readonly type: typeof REFRESH_TOKEN_RQUEST_SUCCESS;
    readonly user: TUser;
};

interface IRefreshTokenRequestFailedAction {
    readonly type: typeof REFRESH_TOKEN_RQUEST_FAILED;
    readonly err: string;
};

interface IGetUserRequestAction {
    readonly type: typeof GET_USER_RQUEST;
};

interface IGetUserRequestFinishAction {
    readonly type: typeof GET_USER_RQUEST_FINISH;
};

interface IGetUserRequestSuccessAction {
    readonly type: typeof GET_USER_RQUEST_SUCCESS;
    readonly user: TUser;
};

interface IGetUserRequestFailedAction {
    readonly type: typeof GET_USER_RQUEST_FAILED;
    readonly err: string;
};

interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_RQUEST;
};

interface IUpdateUserRequestFinishAction {
    readonly type: typeof UPDATE_USER_RQUEST_FINISH;
};

interface IUpdateUserRequestSuccessAction {
    readonly type: typeof UPDATE_USER_RQUEST_SUCCESS;
    readonly user: TUser;
};

interface IUpdateUserRequestFailedAction {
    readonly type: typeof UPDATE_USER_RQUEST_FAILED;
    readonly err: string;
};

type TUserLoginRequestActions =
    | ILoginRequestAction | ILoginRequestFailedAction | ILoginRequestFinishAction | ILoginRequestSuccessAction;

type TUserRegisterRequestActions =
    | IRegisterRequestAction | IRegisterRequestFinishAction | IRegisterRequestSuccessAction | IRegisterRequestFailedAction;

type TUserLogoutRequestActions =
    | ILogoutRequestAction | ILogoutRequestFinishAction | ILogoutRequestSuccessAction | ILogoutRequestFailedAction;

type TUserRefreshRequestActions =
    | IRefreshTokenRequestAction | IRefreshTokenRequestFinishAction | IRefreshTokenRequestSuccessAction | IRefreshTokenRequestFailedAction;

type TUserGetRequestActions =
    | IGetUserRequestAction | IGetUserRequestFinishAction | IGetUserRequestSuccessAction | IGetUserRequestFailedAction;

type TUserUpdateRequestActions =
    | IUpdateUserRequestAction | IUpdateUserRequestFinishAction | IUpdateUserRequestSuccessAction | IUpdateUserRequestFailedAction;

export type TUserActions =
    | TUserLoginRequestActions
    | TUserRegisterRequestActions
    | TUserLogoutRequestActions
    | TUserRefreshRequestActions
    | TUserGetRequestActions
    | TUserUpdateRequestActions;

//Actions Functions
export const loginRequestAction = (): ILoginRequestAction => ({
    type: LOGIN_RQUEST,
});

export const loginRequestFailedAction = (err: string): ILoginRequestFailedAction => ({
    type: LOGIN_RQUEST_FAILED,
    err
});

export const loginRequestFinishAction = (): ILoginRequestFinishAction => ({
    type: LOGIN_RQUEST_FINISH
});

export const loginRequestSuccessAction = (user: Readonly<TUser>): ILoginRequestSuccessAction => ({
    type: LOGIN_RQUEST_SUCCESS,
    user
});

export const registerRequestAction = (): IRegisterRequestAction => ({
    type: REGISTER_RQUEST
});

export const registerRequestFinishAction = (): IRegisterRequestFinishAction => ({
    type: REGISTER_RQUEST_FINISH,
});

export const registerRequestSuccessAction = (user: Readonly<TUser>): IRegisterRequestSuccessAction => ({
    type: REGISTER_RQUEST_SUCCESS,
    user
});

export const registerRequestFailedAction = (err: string): IRegisterRequestFailedAction => ({
    type: REGISTER_RQUEST_FAILED,
    err
});

export const logoutRequestAction = (): ILogoutRequestAction => ({
    type: LOGOUT_RQUEST,
});

export const logoutRequestFinishAction = (): ILogoutRequestFinishAction => ({
    type: LOGOUT_RQUEST_FINISH,
});

export const logoutRequestSuccessAction = (user: Readonly<TUser>): ILogoutRequestSuccessAction => ({
    type: LOGOUT_RQUEST_SUCCESS,
    user
});

export const logoutRequestFailedAction = (err: string): ILogoutRequestFailedAction => ({
    type: LOGOUT_RQUEST_FAILED,
    err
});

export const refreshTokenRequestAction = (): IRefreshTokenRequestAction => ({
    type: REFRESH_TOKEN_RQUEST,
});

export const refreshTokenRequestFinishAction = (): IRefreshTokenRequestFinishAction => ({
    type: REFRESH_TOKEN_RQUEST_FINISH,
});

export const refreshTokenRequestSuccessAction = (user: Readonly<TUser>): IRefreshTokenRequestSuccessAction => ({
    type: REFRESH_TOKEN_RQUEST_SUCCESS,
    user,
});

export const refreshTokenRequestFailedAction = (err: string): IRefreshTokenRequestFailedAction => ({
    type: REFRESH_TOKEN_RQUEST_FAILED,
    err
});

export const getUserRequestAction = ():IGetUserRequestAction => ({
    type: GET_USER_RQUEST,
});

export const getUserRequestFinishAction = ():IGetUserRequestFinishAction => ({
    type: GET_USER_RQUEST_FINISH,
});

export const getUserRequestSuccessAction = (user: Readonly<TUser>):IGetUserRequestSuccessAction => ({
    type:GET_USER_RQUEST_SUCCESS,
    user
});

export const getUserRequestFailedAction = (err: string):IGetUserRequestFailedAction => ({
    type: GET_USER_RQUEST_FAILED,
    err
});

export const updateUserRequestAction = ():IUpdateUserRequestAction => ({
    type: UPDATE_USER_RQUEST,
});

export const updateUserRequestFinishAction = ():IUpdateUserRequestFinishAction => ({
    type: UPDATE_USER_RQUEST_FINISH,
});

export const updateUserRequestSuccessAction = (user: Readonly<TUser>):IUpdateUserRequestSuccessAction => ({
    type: UPDATE_USER_RQUEST_SUCCESS,
    user
});

export const updateUserRequestFailedAction = (err:string):IUpdateUserRequestFailedAction => ({
    type: UPDATE_USER_RQUEST_FAILED,
    err
});

//@ts-ignore
export function login(form) {
    //@ts-ignore
    return function (dispatch) {
        dispatch({ type: LOGIN_RQUEST });
        loginRequest(form)
            //@ts-ignore
            .then(res => {
                let authToken;
                if (res.accessToken) {
                    if (res.accessToken.indexOf('Bearer') === 0) {
                        authToken = res.accessToken.split('Bearer ')[1];
                    }
                }
                if (authToken) {
                    setCookie('token', authToken);
                    setCookie('refreshToken', res.refreshToken);
                }

                dispatch({ type: LOGIN_RQUEST_SUCCESS, user: res.user });
            })
            //@ts-ignore
            .catch(err => {
                dispatch({
                    type: LOGIN_RQUEST_FAILED,
                    err
                })
            })
            .finally(() => {
                dispatch({
                    type: LOGIN_RQUEST_FINISH
                })
            })
    }
}

//@ts-ignore
export function registeration(form) {
    //@ts-ignore
    return function (dispatch) {
        dispatch({ type: REGISTER_RQUEST });
        registerRequest(form)
            //@ts-ignore
            .then(res => {
                let authToken;
                if (res.accessToken) {
                    if (res.accessToken.indexOf('Bearer') === 0) {
                        authToken = res.accessToken.split('Bearer ')[1];
                    }
                }
                if (authToken) {
                    setCookie('token', authToken);
                    setCookie('refreshToken', res.refreshToken);
                }

                dispatch({ type: REGISTER_RQUEST_SUCCESS, user: res.user })
            })
            //@ts-ignore
            .catch(err => {
                dispatch({
                    type: REGISTER_RQUEST_FAILED,
                    err
                })
            })
            .finally(() => {
                dispatch({
                    type: REGISTER_RQUEST_FINISH
                })
            })
    }
}

export function logout() {
    //@ts-ignore
    return function (dispatch) {
        dispatch({ type: LOGOUT_RQUEST });
        const refreshToken = getCookie('refreshToken');
        logoutRequest(refreshToken)
            //@ts-ignore
            .then(res => {
                if (res.success) {
                    deleteCookie('refreshToken');
                    deleteCookie('token');
                    dispatch({ type: LOGOUT_RQUEST_SUCCESS })
                }
            })
            //@ts-ignore
            .catch(err => {
                dispatch({
                    type: LOGOUT_RQUEST_FAILED,
                    err
                })
            })
            .finally(() => {
                dispatch({
                    type: LOGOUT_RQUEST_FINISH
                })
            })
    }
}

export function getUserInfo() {
    //@ts-ignore
    return function (dispatch) {
        dispatch({ type: GET_USER_RQUEST });
        getUserRequest()
            //@ts-ignore
            .then(res => {
                dispatch({ type: GET_USER_RQUEST_SUCCESS, user: res.user })
            })
            //@ts-ignore
            .catch(err => {
                dispatch({
                    type: GET_USER_RQUEST_FAILED,
                    err
                })
            })
            .finally(() => {
                dispatch({
                    type: GET_USER_RQUEST_FINISH
                })
            })
    }
}

//@ts-ignore
export function updateUserInfo(form) {
    //@ts-ignore
    return function (dispatch) {
        dispatch({ type: UPDATE_USER_RQUEST });
        updateUserRequest(form)
            //@ts-ignore
            .then(res => {
                dispatch({ type: UPDATE_USER_RQUEST_SUCCESS, user: res.user })
            })
            //@ts-ignore
            .catch(err => {
                dispatch({
                    type: UPDATE_USER_RQUEST_FAILED,
                    err
                })
            })
            .finally(() => {
                dispatch({
                    type: UPDATE_USER_RQUEST_FINISH
                })
            })
    }
}