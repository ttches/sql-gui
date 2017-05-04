import { ADD_FAVORITE } from '../actions/index';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_FAVORITE:
      let favorite = action.payload[0];
      let data = action.payload[1];
      let workingState = {...state}
      workingState[favorite] = data;
      return workingState

    default:
      return state;
  }
}
