import { getIngredients } from "../../utils/burger-api";

export const GET_MENU_REQUEST = 'GET_MENU_REQUEST';
export const GET_MENU_REQUEST_SUCCESS = 'GET_MENU_REQUEST_SUCCESS';
export const GET_MENU_REQUEST_FAILED = 'GET_MENU_REQUEST_FAILED';
export const GET_MENU_REQUEST_FINISH = 'GET_MENU_REQUESЕ_FINISH';
export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';


export function getMenu(){
    return function(dispatch){
        dispatch({
            type: GET_MENU_REQUEST
        });
        getIngredients()
            .then(({ data }) => {
                dispatch({
                    type: GET_MENU_REQUEST_SUCCESS,
                    items: data
                })
            })
            .catch(err => {
                console.log('Ошибка получения данных:', err);
                dispatch({
                    type: GET_MENU_REQUEST_FAILED,
                    err
                }) 
            })
            .finally(() => {
                dispatch({
                    type: GET_MENU_REQUEST_FINISH
                })
            })
    }
}