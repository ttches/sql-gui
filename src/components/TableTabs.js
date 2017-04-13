import React, { Component } from 'react';

import TablesDropdownContainer from '../containers/TablesDropdownContainer';

export default class TableTabs extends Component {
  render() {

    function renderTableTabs(tableTab, i) {
      return (
        <div key={i}>
          <TablesDropdownContainer selectedTable={tableTab} />
          <button onClick={this.props.handleClick}>close</button>
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
