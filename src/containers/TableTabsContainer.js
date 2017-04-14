import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTabs from '../components/TableTabs';
import { closeTableTab } from '../actions/index';

class TableTabsContainer extends Component {
  constructor(props){
    super(props);
    this.handleCloseTab = this.handleCloseTab.bind(this);
  }

  handleCloseTab(e) {
    this.props.closeTableTab(e.target.dataset.table);
  }

  render() {

    return (
      <TableTabs
        tabs={this.props.selected.tabs}
        handleClick={this.handleCloseTab} />
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected
  };
}

export default connect(mapStateToProps, { closeTableTab })(TableTabsContainer);
