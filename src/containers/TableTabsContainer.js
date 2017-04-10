import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTabs from '../components/TableTabs';

class TableTabsContainer extends Component {
  render() {

    return (
      <TableTabs
        tabs={this.props.tableTabs} />
    );
  }
}

function mapStateToProps(state) {
  return {
    tableTabs: state.selected.tabs
  };
}

export default connect(mapStateToProps)(TableTabsContainer);
