import { IWsFeedActions } from "../actions/feed";
import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE
} from "../constants/feed";
import { TOrderList } from "../types/data";

type TFeedState = TOrderList & {
    wsConnected: boolean;
}

const initialState: TFeedState = { wsConnected: false, orders: [], total: 0, totalToday: 0, success: false };

export const wsFeedReducer = (state = initialState, action:IWsFeedActions):TFeedState => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS: {
            return { ...state, wsConnected: true };
        }
        case WS_FEED_CONNECTION_CLOSED: {
            return { ...state, wsConnected: false };
        }
        case WS_FEED_CONNECTION_ERROR: {
            return { ...state, wsConnected: false };
        }
        case WS_FEED_GET_MESSAGE: {
            const {orders=[], total=0, totalToday=0} = action.payload;
            return { ...state, orders, total, totalToday };
        }
        default: {
            return state
        }
    }
}