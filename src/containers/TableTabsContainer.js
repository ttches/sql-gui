import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableTabs from '../components/TableTabs';
import { closeTableTab, addTableTab } from '../actions/index';

class TableTabsContainer extends Component {
  constructor(props){
    super(props);
    this.handleCloseTableTab = this.handleCloseTableTab.bind(this);
    this.handleAddTableTab = this.handleAddTableTab.bind(this);
    this.handleTableTabSelect = this.handleTableTabSelect.bind(this);
    this.state = {
      selectedTableTab: ''
    };
  }

  handleCloseTableTab(e) {
    this.props.closeTableTab(e.target.dataset.table);
  }

  //Sends an unused table to action or give error.
  handleAddTableTab() {
    let { tables, tabs } = this.props.selected;
    for (let table of tables) {
      if (tabs.indexOf(table) === -1) {
        this.handleTableTabSelect(table)
        this.props.addTableTab(table);
        return;
      }
    }
    alert('All tables are in use');
  }

  //Changes the selected table, can take either a table name or an html event
  handleTableTabSelect(e) {
    const selectedTableTab = (e.target) ? e.target.dataset.table : e;
    this.setState({
      selectedTableTab
    });
  }

  render() {

    return (
      <TableTabs
        onCloseTableTab={this.handleCloseTableTab}
        onAddTableTab={this.handleAddTableTab}
        onTableTabSelect={this.handleTableTabSelect}
        selectedTableTab={this.state.selectedTableTab}
        tabs={this.props.selected.tabs}  />
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
