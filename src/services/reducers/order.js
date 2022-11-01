import {  countIngredients, moveElementInArray } from "../../utils/utils";
import {
    ADD_INGREDIENTS,
    CLOSE_ORDER_MODAL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_REQUEST_FAILED,
    CREATE_ORDER_REQUEST_FINISH,
    CREATE_ORDER_REQUEST_SUCCESS,
    DELETE_INGREDIENT_FROM_ORDER,
    MOVE_INGREDIENT_IN_ORDER
} from "../actions/order";


const initialState = {
    count: 0,
    price: 0,
    bun: {},
    ingredients: [],
    ingredientCount:[],
    orderIds: [],
    orderNumber: null,
    orderRequest: false,
    orderRequestFailed: false,
    orderRequestFailedMessage: '',
    showOrderModalInfo: false,
    isCanCreateOrder: false
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENTS: {
            const preparedIngredient = { ...action.ingredient }
            const bun = preparedIngredient.type === 'bun' ? preparedIngredient : { ...state.bun };
            const ingredients = preparedIngredient.type !== 'bun' ? [...state.ingredients, preparedIngredient] : [...state.ingredients];

            const allIngredients = [bun, bun, ...ingredients];

            const price = allIngredients.reduce((acc, item) => {

                return Object.keys(item).length !== 0 ? acc + item.price : acc;
            }, 0);

            const orderIds = allIngredients.reduce((acc, item) => {
                return [...acc, item._id];
            }, []);

            const ingredientCount = countIngredients([bun, ...ingredients]);
            
            const count = allIngredients.length;

            return {
                count,
                price,
                orderIds,
                bun,
                ingredients,
                ingredientCount,
                orderNumber: null,
                isCanCreateOrder: Object.keys(bun).length !== 0
            }
        }
        case MOVE_INGREDIENT_IN_ORDER: {
            const newOrder = [...state.ingredients];
            moveElementInArray(newOrder, action.dragIndex, action.hoverIndex);
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
                bun: {},
                ingredients: [],
                orderIds: [],
                ingredientCount:{},
                orderNumber: action.orderNumber,
                orderRequestFailed: false,
                orderRequestFailedMessage: '',
                showOrderModalInfo: true,
                isCanCreateOrder: false
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
        case DELETE_INGREDIENT_FROM_ORDER: {
            
            const newIngredients = [...state.ingredients].filter(ingr => ingr.key !== action.key);
            return {
                ...state,
                ingredientCount: countIngredients([state.bun, ...newIngredients]),
                ingredients: newIngredients
            }
        }
        default: {
            return state;
        }
    }
}