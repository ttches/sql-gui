import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTabs from '../components/TableTabs';

class TableTabsContainer extends Component {
  constructor(){
    super();
    this.handleCloseTab = this.handleCloseTab.bind(this);
  }

  handleCloseTab(e) {
    console.log(e.target);
  }

  render() {

    return (
      <TableTabs
        tabs={this.props.tableTabs}
        handleClick={this.props.handleCloseTab}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    tableTabs: state.selected.tabs
  };
}

export default connect(mapStateToProps)(TableTabsContainer);
