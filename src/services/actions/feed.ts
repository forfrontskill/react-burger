import {
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "../constants/feed";
import { TOrderList } from "../types/data";

interface IWsFeedConnectionStartAction {
    readonly type: typeof WS_FEED_CONNECTION_START;
}

interface IWsFeedConnectionCloseAction {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
};

interface IWsFeedConnectionErrorAction {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
};

interface IWsFeedConnectionSuccessAction {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
};

interface IWsFeedGetMessageAction {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: TOrderList;
};

interface IWsFeedSendMessage {
    readonly type: typeof WS_FEED_SEND_MESSAGE;
};

export type IWsFeedActions =
    | IWsFeedConnectionStartAction
    | IWsFeedConnectionCloseAction
    | IWsFeedConnectionErrorAction
    | IWsFeedConnectionSuccessAction
    | IWsFeedGetMessageAction
    | IWsFeedSendMessage;

export const wsFeedConnectionStart = (): IWsFeedConnectionStartAction => ({
    type: WS_FEED_CONNECTION_START,
})

export const wsFeedConnectionClose = (): IWsFeedConnectionCloseAction => ({
    type: WS_FEED_CONNECTION_CLOSED,
});

export const wsFeedConnectionError = (): IWsFeedConnectionErrorAction => ({
    type: WS_FEED_CONNECTION_ERROR,
});

export const wsFeedConnectionSuccess = (): IWsFeedConnectionSuccessAction => ({
    type: WS_FEED_CONNECTION_SUCCESS,
});

export const wsFeedGetMessage = (payload: TOrderList): IWsFeedGetMessageAction => ({
    type: WS_FEED_GET_MESSAGE,
    payload
});

export const wsFeedSendMessage = (): IWsFeedSendMessage => ({
    type: WS_FEED_SEND_MESSAGE,
})


