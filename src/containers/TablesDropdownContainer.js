import React, { Component } from 'react';
import { connect } from 'react-redux';

import TablesDropdown from '../components/TablesDropdown';
import { updateTableTabs } from '../actions/index';

class TablesDropdownContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedTable: this.props.selectedTable
    };
  }

  //When select changes, update state
  handleChange(e) {
    let oldSelectedTable = this.state.selectedTable;
    this.setState({
      selectedTable: e.target.value
    }, function() {
      //After state updates, update TableTabs.
      this.props.updateTableTabs([oldSelectedTable, this.state.selectedTable]);
    });
  }

  //Updates state when props changes, otherwise breaks state when tableTab is deleted
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTable: nextProps.selectedTable
    })
  }

  render() {
    let { tables, tabs } = this.props.selected;
    let { selectedTable } = this.state;

    //Maps an array of all available tables
    function generateUnusedTables () {
      return tables.filter((table) => {
        return (selectedTable === table || tabs.indexOf(table) === -1);
      });
    }

    return (
      <TablesDropdown
        handleChange={this.handleChange}
        selectedTable={selectedTable}
        tables={generateUnusedTables()} />
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected
  };
}

export default connect(mapStateToProps, { updateTableTabs })(TablesDropdownContainer);
