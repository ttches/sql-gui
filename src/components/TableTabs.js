import React, { Component } from 'react';

import TablesDropdownContainer from '../containers/TablesDropdownContainer';

export default class TableTabs extends Component {
  render() {

    const closeTableTab = this.props.closeTableTab

    function renderTableTabs(tableTab, i) {
      console.log(tableTab);
      return (
        <div key={i}>
          <TablesDropdownContainer selectedTable={tableTab} />
          <button onClick={closeTableTab} data-table={tableTab}>x</button>
        </div>
      );
    }


    return (
      <div>
        {this.props.tabs.map(renderTableTabs)}
        <button
          className='add-table-tab'
          style={{display: `${(this.props.tabs.length > 10) ? 'none' : 'block'}`}}
          onClick={this.props.addTableTab}>
            Add Table
          </button>
      </div>
    );
  }
}
