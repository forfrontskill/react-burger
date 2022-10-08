import { getIngredients } from "../../utils/burger-api";

export const GET_MENU_REQUEST = 'GET_MENU_REQUEST';
export const GET_MENU_REQUES_SUCCESS = 'GET_MENU_REQUES_SUCCESS';
export const GET_MENU_REQUES_FAILED = 'GET_MENU_REQUES_FAILED';
export const GET_MENU_REQUES_FINISH = 'GET_MENU_REQUES_FAILED';


export function getMenu(){
    return function(dispatch){
        dispatch({
            type: GET_MENU_REQUEST
        });
        
        getIngredients()
            .then(({ data }) => {
                dispatch({
                    type: GET_MENU_REQUES_SUCCESS,
                    items: data
                })
            })
            .catch(err => {
                console.log('Ошибка получения данных:', err);
                dispatch({
                    type: GET_MENU_REQUES_FAILED,
                    err
                })
            })
            .finally(() => {
                dispatch({
                    type: GET_MENU_REQUES_FINISH
                })
            })
    }
}