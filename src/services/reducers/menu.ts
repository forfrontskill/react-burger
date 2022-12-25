import { TMenuActions } from "../actions/menu";
import {
    GET_MENU_REQUEST,
    GET_MENU_REQUEST_SUCCESS,
    GET_MENU_REQUEST_FAILED,
    GET_MENU_REQUEST_FINISH,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from "../constants/menu";
import { TIngredient } from '../types/data';

type TMenuState = {
    items: TIngredient[];
    itemsRequest: boolean;
    itemsRequestFailed: boolean;
    itemsRequestFailedMessage?: string;
    showIngredientModalInfo: boolean;
    modalIngredient?: TIngredient;
}

const initialState: TMenuState = {
    items: [],
    itemsRequest: true,
    itemsRequestFailed: false,
    itemsRequestFailedMessage: '',
    showIngredientModalInfo: false,
    //FIXME: check was {} mock
    modalIngredient: undefined
};

export const menuReducer = (state = initialState, action: TMenuActions) => {
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