import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTabs from '../components/TableTabs';
import { closeTableTab, addTableTab } from '../actions/index';

class TableTabsContainer extends Component {
  constructor(props){
    super(props);
    this.handleCloseTableTab = this.handleCloseTableTab.bind(this);
    this.handleAddTableTab = this.handleAddTableTab.bind(this);
  }

  handleCloseTableTab(e) {
    this.props.closeTableTab(e.target.dataset.table);
  }

  //Sends an unused table to action or give error.
  handleAddTableTab() {
    let { tables, tabs } = this.props.selected;
    for (let table of tables) {
      if (tabs.indexOf(table) === -1) {
        this.props.addTableTab(table);
        return;
      }
    }
    alert('All tables are in use');
  }

  render() {

    return (
      <TableTabs
        tabs={this.props.selected.tabs}
        closeTableTab={this.handleCloseTableTab}
        addTableTab={this.handleAddTableTab} />
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected
  };
}

export default connect(mapStateToProps,
  { closeTableTab, addTableTab })(TableTabsContainer);
