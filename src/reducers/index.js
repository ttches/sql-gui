import { combineReducers } from 'redux';
import favoritesReducer from './reducer_favorites';
import savedReducer from './reducer_saved';
import selectedReducer from './reducer_selected';
import sqlDataReducer from './reducer_sql_data';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  saved: savedReducer,
  selected: selectedReducer,
  SQLData: sqlDataReducer
});

export default rootReducer;
