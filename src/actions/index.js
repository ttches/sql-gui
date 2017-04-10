export const UPDATE_TABLE_TABS = 'UPDATE_TABLE_TABS';

export function updateTableTabs(tables) {
  return {
    type: UPDATE_TABLE_TABS,
    payload: tables
  }
}
