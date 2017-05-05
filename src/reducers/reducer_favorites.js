import { cloneDeep } from 'lodash'

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/index';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_FAVORITE:
      let workingState = cloneDeep(state)
      let favorite = action.payload[0];
      let data = cloneDeep(action.payload[1]);
      workingState[favorite] = data;
      return workingState

    case REMOVE_FAVORITE:
      workingState = {...state}
      favorite = action.payload;
      delete workingState[favorite];
      return workingState;

    default:
      return state;
  }
}
