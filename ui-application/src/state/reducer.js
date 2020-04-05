import {combineReducers} from 'redux';
import appReducer from './app/reducer';
import dataReducer from './data/reducer';
import editReducer from './edit/reducer';

export default combineReducers({
  app: appReducer,
  data: dataReducer,
  edit: editReducer,
});
