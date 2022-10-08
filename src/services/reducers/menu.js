import {
    GET_MENU_REQUEST,
    GET_MENU_REQUES_FAILED,
    GET_MENU_REQUES_FINISH,
    GET_MENU_REQUES_SUCCESS
} from '../actions/menu';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsRequestFailed: false,
    itemsRequestFailedMessage: ''
};

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENU_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsRequestFailed: false,
                itemsRequestFailedMessage: ''
            }
        }
        case GET_MENU_REQUES_SUCCESS: {
            return {
                ...state,
                items: action.items
            }
        }
        case GET_MENU_REQUES_FAILED: {
            return {
                ...state,
                items: [],
                itemsRequestFailed: true,
                itemsRequestFailedMessage: action.err
            }
        }
        case GET_MENU_REQUES_FINISH: {
            return {
                ...state,
                itemsRequest: false
            }
        }
        default: {
            return state;
        }
    }
}