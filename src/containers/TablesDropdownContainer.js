import React, { Component } from 'react';
import { connect } from 'react-redux';

import TablesDropdown from '../components/TablesDropdown';

class TablesDropdownContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedTable: this.props.selectedTable
    };
  }

  handleChange(e) {
    this.setState({
      selectedTable: e.target.value
    });
  }

  render() {
    const { tables, tabs } = this.props.selected;
    const selectedTable = this.state;

    function generateUnusedTables () {
      return tables.filter((table) => {
        return (selectedTable === table || tabs.indexOf(table) === -1);
      });
    }

    return (
      <TablesDropdown
        tables={generateUnusedTables()}
        selectedTable={this.state.selectedTable}
        handleChange={this.handleChange}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected
  };
}

export default connect(mapStateToProps)(TablesDropdownContainer);
