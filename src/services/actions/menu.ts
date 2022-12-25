import { getIngredients } from "../../utils/burger-api";
import {
    GET_MENU_REQUEST,
    GET_MENU_REQUEST_SUCCESS,
    GET_MENU_REQUEST_FAILED,
    GET_MENU_REQUEST_FINISH,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from "../constants/menu";
import { TIngredient } from "../types/data";

export interface IGetMenuRequestAction {
    readonly type: typeof GET_MENU_REQUEST;
}

export interface IGetMenuRequestSuccessAction {
    readonly type: typeof GET_MENU_REQUEST_SUCCESS;
    readonly items: ReadonlyArray<TIngredient>
}

export interface IGetMenuRequestFailedAction {
    readonly type: typeof GET_MENU_REQUEST_FAILED;
    readonly err: string;
}

export interface IGetMenuRequestFinishAction {
    readonly type: typeof GET_MENU_REQUEST_FINISH;
}

export interface IOpenIngredientModalAction {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
    readonly ingredient: TIngredient;
}

export interface ICloseIngredientModalAction {
    readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export type TMenuActions =
    | IGetMenuRequestAction
    | IGetMenuRequestSuccessAction
    | IGetMenuRequestFailedAction
    | IGetMenuRequestFinishAction
    | IOpenIngredientModalAction
    | ICloseIngredientModalAction;

export const getMenuRequest = (): IGetMenuRequestAction => ({
    type: GET_MENU_REQUEST,
})

export const getMenuRequestSuccess = (items: ReadonlyArray<TIngredient>): IGetMenuRequestSuccessAction => ({
    type: GET_MENU_REQUEST_SUCCESS,
    items
})

export const getMenuRequestFailed = (err: string): IGetMenuRequestFailedAction => ({
    type: GET_MENU_REQUEST_FAILED,
    err
})

export const getMenuRequestFinish = (): IGetMenuRequestFinishAction => ({
    type: GET_MENU_REQUEST_FINISH,
})

export const openIngredientModal = (ingredient: TIngredient): IOpenIngredientModalAction => ({
    type: OPEN_INGREDIENT_MODAL,
    ingredient
})

export const closeIngredientModal = (): ICloseIngredientModalAction => ({
    type: CLOSE_INGREDIENT_MODAL,
})

export function getMenu() {
    //@ts-ignore
    return function (dispatch) {
        dispatch(getMenuRequest());
        getIngredients()
        //@ts-ignore
            .then(({ data }) => {
                dispatch(getMenuRequestSuccess(data))
            })
            //@ts-ignore
            .catch(err => {
                dispatch(getMenuRequestFailed(err))
            })
            .finally(() => {
                dispatch(getMenuRequestFinish())
            })
    }
}