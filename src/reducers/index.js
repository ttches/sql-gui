import { combineReducers } from 'redux';
import selectedReducer from './reducer_selected';
import favoritesReducer from './reducer_favorites';
import sqlDataReducer from './reducer_sql_data';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  selected: selectedReducer,
  SQLData: sqlDataReducer
});

export default rootReducer;
