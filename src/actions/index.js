export const UPDATE_TABLE_TABS = 'UPDATE_TABLE_TABS';
export const CLOSE_TABLE_TAB = 'CLOSE_TABLE_TAB';
export const ADD_TABLE_TAB = 'ADD_TABLE_TAB';

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
