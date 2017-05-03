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
      </div>
    )
  }

  renderTargets() {
    return <span><span className='keyword'>
     SELECT</span> {this.props.selected.targets.join(', ')}</span>
  }

  renderTables() {
    return <span><span className='keyword'>
     FROM</span> {this.consolidateSelectedTables()}</span>
  }

  consolidateSelectedTables() {
    let tables = Array.from(new Set(this.props.selected.targets
      .map((tableRecord) => {
      tableRecord = tableRecord.slice(0, tableRecord.indexOf('.'))
      return tableRecord
    })));
    return tables.join(', ');
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
