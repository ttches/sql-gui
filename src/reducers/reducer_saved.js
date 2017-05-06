import { cloneDeep } from 'lodash'

import { ADD_SAVED, REMOVE_SAVED } from '../actions/index';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_SAVED:
      let workingState = cloneDeep(state)
      let saved = action.payload[0];
      let data = cloneDeep(action.payload[1]);
      workingState[saved] = data;
      return workingState

    case REMOVE_SAVED:
      workingState = {...state}
      saved = action.payload;
      delete workingState[saved];
      return workingState;

    default:
      return state;
  }
}
