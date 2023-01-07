import { IWsCreatedOrdersActions } from "../actions/createdOrders";
import { IWsFeedActions } from "../actions/feed";
import { TMenuActions } from "../actions/menu";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { store } from '../store';

export type TApplicationActions =
    | IWsCreatedOrdersActions
    | IWsFeedActions
    | TMenuActions
    | TOrderActions
    | TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
