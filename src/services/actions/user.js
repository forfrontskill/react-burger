import { getUserRequest, loginRequest, logoutRequest, registerRequest, updateUserRequest } from "../../utils/burger-api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const LOGIN_RQUEST = 'LOGIN_RQUEST';
export const LOGIN_RQUEST_FINISH = 'LOGIN_RQUEST_FINISH';
export const LOGIN_RQUEST_SUCCESS = 'LOGIN_RQUEST_SUCCESS';
export const LOGIN_RQUEST_FAILED = 'LOGIN_RQUEST_FAILED';

export const REGISTER_RQUEST = 'REGISTER_RQUEST';
export const REGISTER_RQUEST_FINISH = 'REGISTER_RQUEST_FINISH';
export const REGISTER_RQUEST_SUCCESS = 'REGISTER_RQUEST_SUCCESS';
export const REGISTER_RQUEST_FAILED = 'REGISTER_RQUEST_FAILED';

export const LOGOUT_RQUEST = 'LOGOUT_RQUEST';
export const LOGOUT_RQUEST_FINISH = 'LOGOUT_RQUEST_FINISH';
export const LOGOUT_RQUEST_SUCCESS = 'LOGOUT_RQUEST_SUCCESS';
export const LOGOUT_RQUEST_FAILED = 'LOGOUT_RQUEST_FAILED';

export const REFRESH_TOKEN_RQUEST = 'REFRESH_TOKEN_RQUEST';
export const REFRESH_TOKEN_RQUEST_FINISH = 'REFRESH_TOKEN_RQUEST_FINISH';
export const REFRESH_TOKEN_RQUEST_SUCCESS = 'REFRESH_TOKEN_RQUEST_SUCCESS';
export const REFRESH_TOKEN_RQUEST_FAILED = 'REFRESH_TOKEN_RQUEST_FAILED';

export const GET_USER_RQUEST = 'GET_USER_RQUEST';
export const GET_USER_RQUEST_FINISH = 'GET_USER_RQUEST_FINISH';
export const GET_USER_RQUEST_SUCCESS = 'GET_USER_RQUEST_SUCCESS';
export const GET_USER_RQUEST_FAILED = 'GET_USER_RQUEST_FAILED';

export const UPDATE_USER_RQUEST = 'UPDATE_USER_RQUEST';
export const UPDATE_USER_RQUEST_FINISH = 'UPDATE_USER_RQUEST_FINISH';
export const UPDATE_USER_RQUEST_SUCCESS = 'UPDATE_USER_RQUEST_SUCCESS';
export const UPDATE_USER_RQUEST_FAILED = 'UPDATE_USER_RQUEST_FAILED';


export function login(form){
    return function(dispatch){
        dispatch({type: LOGIN_RQUEST});
        loginRequest(form)
        .then(res => {
            let authToken;
            if(res.accessToken){
                if (res.accessToken.indexOf('Bearer') === 0) {
                    authToken = res.accessToken.split('Bearer ')[1];
                }
            }
            if (authToken) {
                setCookie('token', authToken);
                setCookie('refreshToken', res.refreshToken);
            }

            dispatch({type: LOGIN_RQUEST_SUCCESS, user: res.user});
        })
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

export function registeration(form){
    return function(dispatch){
        dispatch({type: REGISTER_RQUEST});
        registerRequest(form)
        .then(res => {
            let authToken;
            if(res.accessToken){
                if (res.accessToken.indexOf('Bearer') === 0) {
                    authToken = res.accessToken.split('Bearer ')[1];
                }
            }
            if (authToken) {
                setCookie('token', authToken);
                setCookie('refreshToken', res.refreshToken);
            }

            dispatch({type: REGISTER_RQUEST_SUCCESS, user: res.user})
        })
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

export function logout(){
    return function(dispatch){
        dispatch({type: LOGOUT_RQUEST});
        const refreshToken = getCookie('refreshToken');
        logoutRequest(refreshToken)
        .then(res => {
            if (res.success) {
                deleteCookie('refreshToken');
                deleteCookie('token');
                dispatch({type: LOGOUT_RQUEST_SUCCESS})
            }
        })
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

export function getUserInfo(){
    return function(dispatch){
        dispatch({type: GET_USER_RQUEST});
        getUserRequest()
        .then(res => {
            dispatch({type: GET_USER_RQUEST_SUCCESS, user: res.user})
        })
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

export function updateUserInfo(form){
    return function(dispatch){
        dispatch({type: UPDATE_USER_RQUEST});
        updateUserRequest(form)
        .then(res => {
            dispatch({type: UPDATE_USER_RQUEST_SUCCESS, user: res.user})
        })
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