import {
    CLOSE_INGREDIENT_MODAL,
    GET_MENU_REQUEST,
    GET_MENU_REQUEST_FAILED,
    GET_MENU_REQUEST_FINISH,
    GET_MENU_REQUEST_SUCCESS,
    OPEN_INGREDIENT_MODAL
} from '../actions/menu';

const initialState = {
    items: [],
    itemsRequest: true,
    itemsRequestFailed: false,
    itemsRequestFailedMessage: '',
    showIngredientModalInfo: false,
    modalIngredient: {}
};

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENU_REQUEST_SUCCESS: {
            return {
                ...state,
                items: action.items
            }
        }
        case GET_MENU_REQUEST_FAILED: {
            return {
                ...state,
                items: [],
                itemsRequestFailed: true,
                itemsRequestFailedMessage: action.err
            }
        }
        case GET_MENU_REQUEST_FINISH: {
            return {
                ...state,
                itemsRequest: false
            }
        }
        case GET_MENU_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
                itemsRequestFailed: false,
                itemsRequestFailedMessage: ''
            }
        }
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                showIngredientModalInfo: true,
                modalIngredient: action.ingredient
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                showIngredientModalInfo: false,
                modalIngredient: {}
            }
        }
        default: {
            return state;
        }
    }
}