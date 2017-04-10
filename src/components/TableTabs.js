import React, { Component } from 'react';

import TablesDropdownContainer from '../containers/TablesDropdownContainer';

export default class TableTabs extends Component {
  render() {

    function renderTableTabs(tableTab, i) {
      console.log(tableTab);
      return <TablesDropdownContainer key={i} selectedTable={tableTab} />
    }


    return (
      <div>
        {this.props.tabs.map(renderTableTabs)}
      </div>
    );
  }
}
