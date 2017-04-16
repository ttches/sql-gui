import React, { Component } from 'react';

import TablesDropdownContainer from '../containers/TablesDropdownContainer';

export default class TableTabs extends Component {
  render() {

    const { onCloseTableTab, selectedTableTab, onTableTabSelect } = this.props;

    //Only the selectedTableTab should appear as a selection, the other tables are spans
    function renderTableTabs(tableTab, i) {
      if (tableTab === selectedTableTab) {
        return (
          <div className='table-tab' key={i}>
            <TablesDropdownContainer selectedTable={tableTab} />
            <button onClick={onCloseTableTab} data-table={tableTab}>x</button>
          </div>
        );

      } else {
        return (
          <div className='table-tab' key={i}>
            <div onClick={onTableTabSelect}
              data-table={tableTab}>{tableTab}</div>
            <button onClick={onCloseTableTab} data-table={tableTab}>x</button>
          </div>
        );
      }
    }


    return (
      <div className='table-tabs'>
        {this.props.tabs.map(renderTableTabs)}
        <button
          className='add-table-tab'
          style={{display: `${(this.props.tabs.length > 10) ? 'none' : 'block'}`}}
          onClick={this.props.onAddTableTab}>
            Add Table
          </button>
      </div>
    );
  }
}
