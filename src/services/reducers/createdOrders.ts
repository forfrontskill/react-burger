import { IWsCreatedOrdersActions } from "../actions/createdOrders";
import {
    WS_CREATED_ORDERS_CONNECTION_CLOSED,
    WS_CREATED_ORDERS_CONNECTION_ERROR,
    WS_CREATED_ORDERS_CONNECTION_SUCCESS,
    WS_CREATED_ORDERS_GET_MESSAGE
} from "../constants/createdOrders";
import { TOrderList } from "../types/data";

type TOrderState = TOrderList & {
    wsConnected: boolean;
}

const initialState: TOrderState = { wsConnected: false, orders: [], total: 0, totalToday: 0, success: false };

export const wsCreatedOrdersReducer = (state = initialState, action: IWsCreatedOrdersActions):TOrderState => {
    switch (action.type) {
        case WS_CREATED_ORDERS_CONNECTION_SUCCESS: {
            return { ...state, wsConnected: true };
        }
        case WS_CREATED_ORDERS_CONNECTION_CLOSED: {
            return { ...state, wsConnected: false };
        }
        case WS_CREATED_ORDERS_CONNECTION_ERROR: {
            return { ...state, wsConnected: false };
        }
        case WS_CREATED_ORDERS_GET_MESSAGE: {
            const { orders = [], total = 0, totalToday = 0 } = action.payload;
            return { ...state, orders, total, totalToday };
        }
        default: {
            return state;
        }
    }
}