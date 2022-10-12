import { createOrderRequest } from "../../utils/burger-api";

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_REQUEST_SUCCESS = 'CREATE_ORDER_REQUEST_SUCCESS';
export const CREATE_ORDER_REQUEST_FAILED = 'CREATE_ORDER_REQUEST_FAILED';
export const CREATE_ORDER_REQUEST_FINISH = 'CREATE_ORDER_REQUEST_FINISH';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const MOVE_INGREDIENT_IN_ORDER = 'MOVE_INGREDIENT_IN_ORDER';
export const DELETE_INGREDIENT_FROM_ORDER = 'DELETE_INGREDIENT_FROM_ORDER';

export function createOrder(orderIds) {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });
        createOrderRequest(orderIds)
            .then((data) => {
                dispatch({ type: CREATE_ORDER_REQUEST_SUCCESS, orderNumber: data.order.number });
            })
            .catch(err => {
                dispatch({ type: CREATE_ORDER_REQUEST_FAILED, err })
            })
            .finally(() => {
                dispatch({ type: CREATE_ORDER_REQUEST_FINISH })
            })
    }
}