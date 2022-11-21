import { combineReducers } from 'redux';
import { menuReducer } from '../reducers/menu';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    menu: menuReducer,
    order: orderReducer,
    user: userReducer
});