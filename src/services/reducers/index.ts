import { combineReducers } from 'redux';
import { menuReducer } from './menu';
import { wsCreatedOrdersReducer } from './createdOrders';
import { wsFeedReducer } from './feed';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    menu: menuReducer,
    order: orderReducer,
    user: userReducer,
    feed: wsFeedReducer,
    createdOrders: wsCreatedOrdersReducer,
});