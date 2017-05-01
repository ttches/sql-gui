import React, { Component } from 'react';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import { removeFilterEqualLessGreater } from '../actions/index';

class SelectedTablesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFilterEqualLessGreaterClick = this.handleFilterEqualLessGreaterClick.bind(this);
    this.generateFilteredEqual = this.generateFilteredEqual.bind(this);
  }

  handleFilterEqualLessGreaterClick(e) {
    console.log(e.target.dataset.filtertable);
    let { filtertable, filtertype } = e.target.dataset;
    if (filtertype === 'less' || filtertype === 'greater') {
      filtertype = `${filtertype}Than`;
    }
    this.props.removeFilterEqualLessGreater([filtertype, filtertable])
  }

  generateFilteredEqual(filterTable) {
    return (
      <Filters
        filterTable={filterTable}
        filterType='equal'
        filterValues={this.props.selected.equal}
        handleTargetClick={this.handleFilterEqualClick} />
    )
  }
  //renders all selected filters
  render() {
    return (
      <span className='console-filtered'>
        <Filters
          filterSymbol='='
          filterType='equal'
          filterValues={this.props.selected.equal}
          handleTargetClick={this.handleFilterEqualLessGreaterClick} />
        <Filters
          filterSymbol='>'
          filterType='greater'
          filterValues={this.props.selected.greaterThan}
          handleTargetClick={this.handleFilterEqualLessGreaterClick} />
        <Filters
          filterSymbol='<'
          filterType='less'
          filterValues={this.props.selected.lessThan}
          handleTargetClick={this.handleFilterEqualLessGreaterClick} />
      </span>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected,
  };
}

export default connect(mapStateToProps,
  { removeFilterEqualLessGreater })(SelectedTablesContainer);
