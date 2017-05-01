import React, { Component } from 'react';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import FiltersNotLike from '../components/FiltersNotLike';
import { removeFilterEqualLessGreater } from '../actions/index';

class SelectedTablesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFilterEqualLessGreaterClick = this.handleFilterEqualLessGreaterClick.bind(this);
    this.generateFilteredEqualLessGreater = this.generateFilteredEqualLessGreater.bind(this);
    this.generateFilteredNot = this.generateFilteredNot.bind(this);
  }

  handleFilterEqualLessGreaterClick(e) {
    let { filtertable, filtertype } = e.target.dataset;
    if (filtertype === 'less' || filtertype === 'greater') {
      filtertype = `${filtertype}Than`;
    }
    this.props.removeFilterEqualLessGreater([filtertype, filtertable])
  }

  //filterValuesType is a hack beause in the redux store, the filters are greaterThan and lessThan
  //but just greater and less are used in other places.
  generateFilteredEqualLessGreater(filterType, i) {
    const filterSymbols = {equal: '=', less: '<', greater: '>'}
    let filterValuesType = filterType;
    if (filterValuesType === 'less' || filterType === 'greater') {
      filterValuesType += 'Than';
    }
    return (
      <FiltersNotLike
        filterSymbol={filterSymbols[filterType]}
        filterType={filterType}
        filterValues={this.props.selected[filterValuesType]}
        handleTargetClick={this.handleFilterEqualLessGreaterClick}
        key={i} />
    )
  }

  generateFilteredNot(tableRecord, i) {
    return (
      <Filters
        filterSymbol='!='
        filterType='not'
        filterValues={tableRecord}
        key={i} />
    )
  }
  //renders all selected filters
  render() {
    const equalLessGreaterArr = ['equal', 'less', 'greater'];
    const notArr = Object.keys(this.props.selected.not);
    console.log(notArr)

    return (
      <span className='console-filtered'>
        {equalLessGreaterArr.map(this.generateFilteredEqualLessGreater)}
        {notArr.map(this.generateFilteredEqualLessGreater)}
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
