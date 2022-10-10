import { moveElementInArray } from "../../utils/utils";
import { ADD_INGREDIENTS, CLOSE_ORDER_MODAL, CREATE_ORDER_REQUEST, CREATE_ORDER_REQUEST_FAILED, CREATE_ORDER_REQUEST_FINISH, CREATE_ORDER_REQUEST_SUCCESS, MOVE_INGREDIENT_IN_ORDER, ORDER_NUMBER_CREATED } from "../actions/order";


const initialState = {
    price: 0,
    bun: {},
    ingredients: [],
    orderIds: [],
    orderNumber: null,
    orderRequest: false,
    orderRequestFailed: false,
    orderRequestFailedMessage: '',
    showOrderModalInfo: false
};

export const orderReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_INGREDIENTS: {
            const bun = action.ingredients.find((ingredient) => ingredient.type === 'bun');
            const ingredientWithoutBuns = action.ingredients.filter((ingredient) => ingredient.type !== 'bun');

            const combinedBun = bun ? bun : { ...state.bun };
            const combinedIngredients = ingredientWithoutBuns ? [...state.ingredients, ...ingredientWithoutBuns] : [...state.ingredients];

            const allIngredients = [combinedBun, combinedBun, ...combinedIngredients];

            const price = allIngredients.reduce((acc, item) => {
                return acc + item.price;
            }, 0);

            const orderIds = allIngredients.reduce((acc, item) => {
                return [...acc, item._id];
            }, []);

            return {
                price,
                orderIds,
                bun: combinedBun,
                ingredients: combinedIngredients,
                orderNumber: null
            }
        }
        case MOVE_INGREDIENT_IN_ORDER: {
            const newOrder = [...state.ingredients];
            moveElementInArray(newOrder, action.dragIndex, action.hoverIndex);
            console.log('newOrder',newOrder);
            return {
                ...state,
                ingredients: newOrder
            }
        }
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderRequestFailed: false,
                orderRequestFailedMessage: ''
            }
        }
        case CREATE_ORDER_REQUEST_SUCCESS: {
            return {
                price: 0,
                bun: undefined,
                ingredients: [],
                orderIds: [],
                orderNumber: action.orderNumber,
                orderRequestFailed: false,
                orderRequestFailedMessage: '',
                showOrderModalInfo: true
            }
        }
        case CREATE_ORDER_REQUEST_FAILED: {
            return {
                ...state,
                orderRequestFailed: false,
                orderRequestFailedMessage: action.err
            }
        }
        case CREATE_ORDER_REQUEST_FINISH: {
            return {
                ...state,
                orderRequest: false
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                showOrderModalInfo: false
            }
        }
        default: {
            return state;
        }
    }
}