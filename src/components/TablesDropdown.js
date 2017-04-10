import React, { Component } from 'react';

export default class TablesDropdown extends Component {
  render() {

    function renderSelect(table, i, selectedTable) {
      return (
        <option key={i} value={table}>{table}</option>
      );
    }

    return (
      <select
        onChange={this.props.handleChange}
        value={this.props.selectedTable}>
        {this.props.tables.map(renderSelect)}
      </select>
    );
  }
}
