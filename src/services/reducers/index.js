import { combineReducers } from 'redux';
import { menuReducer } from '../reducers/menu';

export const rootReducer = combineReducers({
    menu: menuReducer
});