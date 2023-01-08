import {
    WS_CREATED_ORDERS_CONNECTION_START,
    WS_CREATED_ORDERS_CONNECTION_SUCCESS,
    WS_CREATED_ORDERS_CONNECTION_ERROR,
    WS_CREATED_ORDERS_CONNECTION_CLOSED,
    WS_CREATED_ORDERS_GET_MESSAGE,
    WS_CREATED_ORDERS_SEND_MESSAGE,
} from '../constants/createdOrders';
import { TOrderList } from '../types/data';

interface IWsCreatedOrdersConnectionStartAction {
    readonly type: typeof WS_CREATED_ORDERS_CONNECTION_START;
};

interface IWsCreatedOrdersConnectionSuccessAction {
    readonly type: typeof WS_CREATED_ORDERS_CONNECTION_SUCCESS;
};

interface IWsCreatedOrdersConnectionErrorAction {
    readonly type: typeof WS_CREATED_ORDERS_CONNECTION_ERROR;
};

interface IWsCreatedOrdersConnectionClosedAction {
    readonly type: typeof WS_CREATED_ORDERS_CONNECTION_CLOSED;
};

interface IWsCreatedOrdersGetMessageAction {
    readonly type: typeof WS_CREATED_ORDERS_GET_MESSAGE;
    readonly payload: TOrderList;
};

interface IWsCreatedOrdersSendMessageAction {
    readonly type: typeof WS_CREATED_ORDERS_SEND_MESSAGE;
};



export type IWsCreatedOrdersActions =
    | IWsCreatedOrdersConnectionStartAction
    | IWsCreatedOrdersConnectionSuccessAction
    | IWsCreatedOrdersConnectionErrorAction
    | IWsCreatedOrdersConnectionClosedAction
    | IWsCreatedOrdersGetMessageAction
    | IWsCreatedOrdersSendMessageAction;

export const wsCreatedOrdersConnectionStart = ():IWsCreatedOrdersConnectionStartAction => ({
    type: WS_CREATED_ORDERS_CONNECTION_START,
});

export const wsCreatedOrdersConnectionSuccess = ():IWsCreatedOrdersConnectionSuccessAction => ({
    type:WS_CREATED_ORDERS_CONNECTION_SUCCESS,
});

export const wsCreatedOrdersConnectionError = ():IWsCreatedOrdersConnectionErrorAction => ({
    type: WS_CREATED_ORDERS_CONNECTION_ERROR,
});

export const wsCreatedOrdersConnectionClosed = ():IWsCreatedOrdersConnectionClosedAction => ({
    type: WS_CREATED_ORDERS_CONNECTION_CLOSED,
});

export const wsCreatedOrdersGetMessage = (payload: TOrderList):IWsCreatedOrdersGetMessageAction => ({
    type: WS_CREATED_ORDERS_GET_MESSAGE,
    payload
});

export const wsCreatedOrdersSendMessage = ():IWsCreatedOrdersSendMessageAction => ({
    type: WS_CREATED_ORDERS_SEND_MESSAGE,
});