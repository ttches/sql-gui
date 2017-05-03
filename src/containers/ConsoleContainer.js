import React, { Component } from 'react';
import { connect } from 'react-redux';

import Console from '../components/Console';
import { removeTarget } from '../actions/index';

class ConsoleContainer extends Component {
  constructor(props) {
    super(props);
    this.renderSQLScript = this.renderSQLScript.bind(this);
  }

  renderSQLScript() {
    if (this.props.selected.targets < 1) {
      return <span>Add a table and selected a record to create SQL code</span>
    }
    return (
      <div>
        <div>{this.renderTargets()}</div>
        <div>{this.renderTables()}</div>
        <div>{this.renderFilters()}</div>
      </div>
    )
  }

  renderTargets() {
    return (
      <span>
        <span className='keyword'>SELECT </span>
        {this.props.selected.targets.join(', ')}
      </span>
    )
  }

  renderTables() {
    return (
      <span>
        <span className='keyword'>FROM </span>
        {this.consolidateSelectedTables()}
      </span>
    )
  }

  //This removes duplicate Tables so they don't appear more than once in FROM
  consolidateSelectedTables() {
    let tables = Array.from(new Set(this.props.selected.targets
      .map((tableRecord) => {
      tableRecord = tableRecord.slice(0, tableRecord.indexOf('.'))
      return tableRecord
    })));
    return tables.join(', ');
  }

  renderFilters() {
    let { equal, lessThan, greaterThan, not, like } = this.props.selected;
    //Determines whether any filters exist
    const filterNumber = [equal, lessThan, greaterThan, not, like]
      .reduce((total, filter) => {
        return total + Object.keys(filter).length
      }, 0);
    //If there are no filters, do not try to add them.
    if (filterNumber) {
      const equalLessGreaterArr = ['equal', 'lessThan', 'greaterThan'];
      let filterOutput =
        equalLessGreaterArr.map(this.renderEqualLessGreater.bind(this))
    //gets rid of blank array items
        .filter((filter) => filter !== '');
    //flatten array of filters
      filterOutput = [].concat(...filterOutput);
      console.log(filterOutput);
      return (
        <span>
          <span className='keyword'>WHERE </span>
          {filterOutput.map(this.renderAnd)}
        </span>
      )
    }
  }

  renderAnd(filterValue, i) {
    if (i === 0) {
      return (
        <span key={i}>
          {filterValue}
        </span>
      )
    }
    return (
      <span key={i}>
        <span className='keyword'> AND </span>
        {filterValue}
      </span>
    )
  }

  renderEqualLessGreater(filter) {
    console.log('filter =', filter)
    const symbols = {equal: '=', lessThan: '<', greaterThan: '>'};
    console.log(this.props.selected[filter])
    return Object.keys(this.props.selected[filter]).map((tableRecord) => {
      return `${tableRecord} ${symbols[filter]} ${this.props.selected[filter][tableRecord]}`
    })
  }

  render() {
    return (
      <Console
        script={this.renderSQLScript()} />
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected,
  };
}

export default connect(mapStateToProps, { removeTarget })(ConsoleContainer);
