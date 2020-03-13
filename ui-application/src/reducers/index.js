import {combineReducers} from 'redux';
import basketReducer from './basketReducer';
import itemReducer from './itemReducers'

export default combineReducers({
	baskets: basketReducer,
	items: itemReducer
});
