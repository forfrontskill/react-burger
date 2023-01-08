import { countIngredients, moveElementInArray } from "../../utils/utils";
import { TOrderActions } from "../actions/order";
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
import { TIngredientOrderCount, TIngredientOrder } from '../types/data';

export type TOrderState = {
    count: number;
    price: number;
    bun?: TIngredientOrder;
    ingredients: TIngredientOrder[];
    ingredientCount: TIngredientOrderCount;
    orderIds?: string[];
    orderNumber?: number;
    orderRequest: boolean;
    orderRequestFailed: boolean;
    orderRequestFailedMessage?: string;
    showOrderModalInfo: boolean;
    isCanCreateOrder: boolean;
}

const initialState: TOrderState = {
    count: 0,
    price: 0,
    bun: undefined,
    ingredients: [],
    ingredientCount: {},
    orderIds: [],
    orderNumber: undefined,
    orderRequest: false,
    orderRequestFailed: false,
    orderRequestFailedMessage: '',
    showOrderModalInfo: false,
    isCanCreateOrder: false
};


export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case ADD_INGREDIENTS: {
            const preparedIngredient: TIngredientOrder = { ...action.ingredient };

            let bun;
            let allIngredients;
            let ingredientCount;
            const ingredients: TIngredientOrder[] = preparedIngredient.type !== 'bun' ? [...state.ingredients, preparedIngredient] : [...state.ingredients];

            if (preparedIngredient.type === 'bun') {
                bun = preparedIngredient;
                allIngredients = [bun, bun, ...ingredients];
                ingredientCount = countIngredients([bun, ...ingredients])
            } else {
                if (state.bun) {
                    bun = state.bun;
                    allIngredients = [bun, bun, ...ingredients];
                    ingredientCount = countIngredients([bun, ...ingredients])
                } else {
                    bun = undefined;
                    allIngredients = [...ingredients];
                    ingredientCount = countIngredients([...ingredients])
                }
            }

            const price = allIngredients.reduce((acc, item) => {
                const price = item?.price ? item.price : 0;
                return Object.keys(item).length !== 0 ? acc + price : acc;
            }, 0);

            const orderIds = allIngredients.reduce((acc, item) => {
                if (item._id) {
                    return [...acc, item._id];
                } else {
                    return acc;
                }
            }, [] as string[]);

            const count = allIngredients.length;

            return {
                ...state,
                count,
                price,
                orderIds,
                bun: bun,
                ingredients,
                ingredientCount,
                orderNumber: undefined,
                isCanCreateOrder: bun ? Object.keys(bun).length !== 0 : false
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
                count: 0,
                price: 0,
                bun: undefined,
                ingredients: [],
                orderIds: [],
                ingredientCount: {},
                orderRequest: false,
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

            if(state.bun){
                const price = [...state.ingredients, state.bun].reduce((acc, item) => {
                    const price = item?.price ? item.price : 0;
                    return Object.keys(item).length !== 0 ? acc + price : acc;
                }, 0);

                return {
                    ...state,
                    price,
                    ingredientCount: countIngredients([state.bun, ...newIngredients]),
                    ingredients: newIngredients
                }

            } else {
                const price = [...state.ingredients].reduce((acc, item) => {
                    const price = item?.price ? item.price : 0;
                    return Object.keys(item).length !== 0 ? acc + price : acc;
                }, 0);

                return {
                    ...state,
                    price,
                    ingredientCount: countIngredients([...newIngredients]),
                    ingredients: newIngredients
                }

            }

            
        }
        default: {
            return state;
        }
    }
}