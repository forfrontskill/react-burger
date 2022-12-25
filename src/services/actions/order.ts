import { createOrderRequest } from "../../utils/burger-api";

import {
    ADD_INGREDIENTS,
    CLOSE_ORDER_MODAL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_REQUEST_FAILED,
    CREATE_ORDER_REQUEST_FINISH,
    CREATE_ORDER_REQUEST_SUCCESS,
    DELETE_INGREDIENT_FROM_ORDER,
    MOVE_INGREDIENT_IN_ORDER
} from "../constants/order";
import { TIngredientOrder } from "../types/data";

export interface IAddIngredientsAction {
    readonly type: typeof ADD_INGREDIENTS;
    readonly ingredient: TIngredientOrder;
}

export interface ICloseOrderModalAction {
    readonly type: typeof CLOSE_ORDER_MODAL;
}

export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderRequestFailedAction {
    readonly type: typeof CREATE_ORDER_REQUEST_FAILED;
    readonly err: string;
}

export interface ICreateOrderRequestFinishAction {
    readonly type: typeof CREATE_ORDER_REQUEST_FINISH;
}

export interface ICreateOrderRequestSuccessAction {
    readonly type: typeof CREATE_ORDER_REQUEST_SUCCESS;
    readonly orderNumber: number;
}

export interface IDeleteIngredientFromOrderAction {
    readonly type: typeof DELETE_INGREDIENT_FROM_ORDER;
    readonly key: string;
}

export interface IMoveIngredientInOrderAction {
    readonly type: typeof MOVE_INGREDIENT_IN_ORDER;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export type TOrderActions =
    | IAddIngredientsAction
    | ICloseOrderModalAction
    | ICreateOrderRequestAction
    | ICreateOrderRequestFailedAction
    | ICreateOrderRequestFinishAction
    | ICreateOrderRequestSuccessAction
    | IDeleteIngredientFromOrderAction
    | IMoveIngredientInOrderAction;

export const addIngredients = (ingredient: TIngredientOrder): IAddIngredientsAction => ({
    type: ADD_INGREDIENTS,
    ingredient
});

export const closeOrderModal = (): ICloseOrderModalAction => ({
    type: CLOSE_ORDER_MODAL,
});

export const createOrderAction = (): ICreateOrderRequestAction => ({
    type: CREATE_ORDER_REQUEST,
});

export const createOrderRequestFailedAction = (err: string): ICreateOrderRequestFailedAction => ({
    type: CREATE_ORDER_REQUEST_FAILED,
    err
});

export const createOrderRequestFinishAction = (): ICreateOrderRequestFinishAction => ({
    type: CREATE_ORDER_REQUEST_FINISH,
});

export const createOrderRequestSuccessAction = (orderNumber: number): ICreateOrderRequestSuccessAction => ({
    type: CREATE_ORDER_REQUEST_SUCCESS,
    orderNumber
});

export const deleteIngredientFromOrder = (key: string): IDeleteIngredientFromOrderAction => ({
    type: DELETE_INGREDIENT_FROM_ORDER,
    key
});

export const moveIngredientInOrder = (dragIndex: number, hoverIndex: number): IMoveIngredientInOrderAction => ({
    type: MOVE_INGREDIENT_IN_ORDER,
    dragIndex,
    hoverIndex,
})

export function createOrder(orderIds: string[]) {
    //@ts-ignore
    return function (dispatch) {
        dispatch(createOrderAction());
        createOrderRequest(orderIds)
            //@ts-ignore
            .then((data) => {
                dispatch(createOrderRequestSuccessAction(data.order.number));
            })
            //@ts-ignore
            .catch(err => {
                dispatch(createOrderRequestFailedAction(err))
            })
            .finally(() => {
                dispatch(createOrderRequestFinishAction())
            })
    }
}