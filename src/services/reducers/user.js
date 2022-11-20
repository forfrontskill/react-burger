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
} from "../actions/user"

const initialState = {
    isAuthNeed: true,
    email: '',
    password: '',
    name: '',
    [LOGIN_RQUEST]: {
        request: false,
        requestFailed: false,
        requestFailedMessage: '',
    },
    [REGISTER_RQUEST]: {
        request: false,
        requestFailed: false,
        requestFailedMessage: '',
    },
    [LOGOUT_RQUEST]: {
        request: false,
        requestFailed: false,
        requestFailedMessage: '',
    },
    [REFRESH_TOKEN_RQUEST]: {
        request: false,
        requestFailed: false,
        requestFailedMessage: '',
    },
    [GET_USER_RQUEST]: {
        request: false,
        requestFailed: false,
        requestFailedMessage: '',
    },
    [UPDATE_USER_RQUEST]: {
        request: false,
        requestFailed: false,
        requestFailedMessage: '',
    }

}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_RQUEST: {
            return {
                ...state,
                [LOGIN_RQUEST]: { ...state[LOGIN_RQUEST], request: true }
            }
        }
        case LOGIN_RQUEST_FINISH: {
            return {
                ...state,
                [LOGIN_RQUEST]: { ...state[LOGIN_RQUEST], request: false }
            }
        }
        case LOGIN_RQUEST_SUCCESS: {
            const { email, name } = action.user;
            return {
                ...state,
                email,
                name,
            }
        }
        case LOGIN_RQUEST_FAILED: {
            return {
                ...state,
                [LOGIN_RQUEST]: {
                    ...state[LOGIN_RQUEST],
                    request: false,
                    requestFailed: true,
                    requestFailedMessage: action.err
                }
            }
        }
        case REGISTER_RQUEST: {
            return {
                ...state,
                [REGISTER_RQUEST]: { ...state[REGISTER_RQUEST], request: true }
            }
        }
        case REGISTER_RQUEST_FINISH: {
            return {
                ...state,
                [REGISTER_RQUEST]: { ...state[REGISTER_RQUEST], request: false }
            }
        }
        case REGISTER_RQUEST_SUCCESS: {
            const { email, name } = action.user;
            return {
                ...state,
                email,
                name,
            }
        }
        case REGISTER_RQUEST_FAILED: {
            return {
                ...state,
                [REGISTER_RQUEST]: {
                    ...state[REGISTER_RQUEST],
                    request: false,
                    requestFailed: true,
                    requestFailedMessage: action.err
                }
            }
        }
        case LOGOUT_RQUEST: {
            return {
                ...state,
                [LOGOUT_RQUEST]: { ...state[LOGOUT_RQUEST], request: true }
            }
        }
        case LOGOUT_RQUEST_FINISH: {
            return {
                ...state,
                [LOGOUT_RQUEST]: { ...state[LOGOUT_RQUEST], request: false }
            }
        }
        case LOGOUT_RQUEST_SUCCESS: {
            return {
                ...state,
                email:'',
                name:'',
            }
        }
        case LOGOUT_RQUEST_FAILED: {
            return {
                ...state,
                [LOGOUT_RQUEST]: {
                    ...state[LOGOUT_RQUEST],
                    request: false,
                    requestFailed: true,
                    requestFailedMessage: action.err
                }
            }
        }
        case REFRESH_TOKEN_RQUEST: {
            return {
                ...state,
                [REFRESH_TOKEN_RQUEST]: { ...state[REFRESH_TOKEN_RQUEST], request: true }
            }
        }
        case REFRESH_TOKEN_RQUEST_FINISH: {
            return {
                ...state,
                [REFRESH_TOKEN_RQUEST]: { ...state[REFRESH_TOKEN_RQUEST], request: false }
            }
        }
        case REFRESH_TOKEN_RQUEST_SUCCESS: {
            const { email, name } = action.user;
            return {
                ...state,
                email,
                name,
            }
        }
        case REFRESH_TOKEN_RQUEST_FAILED: {
            return {
                ...state,
                [REFRESH_TOKEN_RQUEST]: {
                    ...state[REFRESH_TOKEN_RQUEST],
                    request: false,
                    requestFailed: true,
                    requestFailedMessage: action.err
                }
            }
        }

        case GET_USER_RQUEST: {
            return {
                ...state,
                [GET_USER_RQUEST]: { ...state[GET_USER_RQUEST], request: true }
            }
        }
        case GET_USER_RQUEST_FINISH: {
            return {
                ...state,
                [GET_USER_RQUEST]: { ...state[GET_USER_RQUEST], request: false },
                isAuthNeed:false
            }
        }
        case GET_USER_RQUEST_SUCCESS: {
            const { email, name, password } = action.user;
            return {
                ...state,
                email,
                name,
                password
            }
        }
        case GET_USER_RQUEST_FAILED: {
            return {
                ...state,
                [GET_USER_RQUEST]: {
                    ...state[GET_USER_RQUEST],
                    request: false,
                    requestFailed: true,
                    requestFailedMessage: action.err
                }
            }
        }

        case UPDATE_USER_RQUEST: {
            return {
                ...state,
                [UPDATE_USER_RQUEST]: { ...state[UPDATE_USER_RQUEST], request: true }
            }
        }
        case UPDATE_USER_RQUEST_FINISH: {
            return {
                ...state,
                [UPDATE_USER_RQUEST]: { ...state[UPDATE_USER_RQUEST], request: false }
            }
        }
        case UPDATE_USER_RQUEST_SUCCESS: {
            const { email, name, password } = action.user;
            return {
                ...state,
                email,
                name,
                password
            }
        }
        case UPDATE_USER_RQUEST_FAILED: {
            return {
                ...state,
                [UPDATE_USER_RQUEST]: {
                    ...state[UPDATE_USER_RQUEST],
                    request: false,
                    requestFailed: true,
                    requestFailedMessage: action.err
                }
            }
        }
        default: {
            return state;
        }
    }
}