import { combineReducers } from 'redux';
import { menuReducer } from '../reducers/menu';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    menu: menuReducer,
    order: orderReducer
});