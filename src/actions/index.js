export const UPDATE_TABLE_TABS = 'UPDATE_TABLE_TABS';
export const CLOSE_TABLE_TAB = 'CLOSE_TABLE_TAB';
export const ADD_TABLE_TAB = 'ADD_TABLE_TAB';
export const UPDATE_SELECTED_TABLE_TAB = 'UPDATE_SELECTED_TABLE_TAB';
export const TOGGLE_SELECTED_RECORD = 'TOGGLE_SELECTED_RECORD';
export const REMOVE_TARGET = 'REMOVE_TARGET';
export const SELECT_ALL_RECORDS = 'SELECT_ALL_RECORDS';
export const DESELECT_ALL_RECORDS = 'DESELECT_ALL_RECORDS';
export const ADD_EQUAL_LESS_GREATER = 'ADD_EQUAL_LESS_GREATER';
export const REMOVE_EQUAL_LESS_GREATER = 'REMOVE_EQUAL_LESS_GREATER';
export const ADD_FILTER_NOT_LIKE = 'ADD_FILTER_NOT_LIKE';
export const REMOVE_FILTER_NOT_LIKE = 'REMOVE_FILTER_NOT_LIKE';

export function updateTableTabs(tables) {
  return {
    type: UPDATE_TABLE_TABS,
    payload: tables
  }
}

export function closeTableTab(tableTab) {
  return {
    type: CLOSE_TABLE_TAB,
    payload: tableTab
  }
}

export function addTableTab(table) {
  console.log('adding');
  return {
    type: ADD_TABLE_TAB,
    payload: table
  }
}

export function updateSelectedTableTab(table) {
  console.log('SELECTING', table);
  return {
    type: UPDATE_SELECTED_TABLE_TAB,
    payload: table
  }
}

export function toggleSelectedRecord(record) {
  console.log('toggle', record);
  return {
    type: TOGGLE_SELECTED_RECORD,
    payload: record
  }
}

export function removeTarget(target) {
  console.log('removing', target);
  return {
    type: REMOVE_TARGET,
    payload: target
  }
}

export function selectAllRecords(records) {
  console.log('selecting', records);
  return {
    type: SELECT_ALL_RECORDS,
    payload: records
  }
}

export function deselectAllRecords(table) {
  console.log('deselecting', table);
  return {
    type: DESELECT_ALL_RECORDS,
    payload: table
  }
}

export function addFilterEqualLessGreater(arr) {
  console.log(`adding ${arr[1]} to ${arr[0]}`);
  return {
    type: ADD_EQUAL_LESS_GREATER,
    payload: arr
  }
}

export function removeFilterEqualLessGreater(arr) {
  console.log(`removing ${arr[1]} from ${arr[0]}`);
  return {
    type: REMOVE_EQUAL_LESS_GREATER,
    payload: arr
  }
}

export function addFilterNotLike(arr) {
  console.log(`adding ${arr[1]} to ${arr[0]}`);
  return {
    type: ADD_FILTER_NOT_LIKE,
    payload: arr
  }
}

export function removeFilterNotLike(arr) {
  console.log(`removing ${arr}`);
  return {
    type: REMOVE_FILTER_NOT_LIKE,
    payload: arr
  }
}
