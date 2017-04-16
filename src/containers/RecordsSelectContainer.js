import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTabs from '../components/TableTabs';
import { closeTableTab, addTableTab } from '../actions/index';

class TableTabsContainer extends Component {
  render() {
    return (
      <div>Placeholder</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected
  };
}

export default connect(mapStateToProps)(TableTabsContainer);
