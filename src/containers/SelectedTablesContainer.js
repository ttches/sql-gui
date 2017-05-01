import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tables from '../components/Tables';
import { removeTarget } from '../actions/index';

class SelectedTablesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleTargetClick = this.handleTargetClick.bind(this);
  }

  handleTargetClick(e) {
    this.props.removeTarget(e.target.innerHTML)
  }

  render() {
    return (
      <Tables targets={this.props.selected.targets}
        handleTargetClick={this.handleTargetClick}
        filterType='target' />
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected,
  };
}

export default connect(mapStateToProps, { removeTarget })(SelectedTablesContainer);
