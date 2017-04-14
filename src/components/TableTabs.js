import React, { Component } from 'react';

import TablesDropdownContainer from '../containers/TablesDropdownContainer';

export default class TableTabs extends Component {
  render() {

    const handleClick = this.props.handleClick

    function renderTableTabs(tableTab, i) {
      console.log(tableTab);
      return (
        <div key={i}>
          <TablesDropdownContainer selectedTable={tableTab} />
          <button onClick={handleClick} data-table={tableTab}>close</button>
        </div>
      );
    }


    return (
      <div>
        {this.props.tabs.map(renderTableTabs)}
      </div>
    );
  }
}
