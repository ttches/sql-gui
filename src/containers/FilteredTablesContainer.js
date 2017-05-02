import React, { Component } from 'react';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import FiltersNotLike from '../components/FiltersNotLike';
import { removeFilterEqualLessGreater,
  removeFilterNotLike } from '../actions/index';

class SelectedTablesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFilterEqualLessGreaterClick = this.handleFilterEqualLessGreaterClick.bind(this);
    this.handleFilterNotLikeClick = this.handleFilterNotLikeClick.bind(this);
    this.generateFilteredEqualLessGreater = this.generateFilteredEqualLessGreater.bind(this);
    this.generateFilteredNot = this.generateFilteredNot.bind(this);
    this.generateFilteredLike = this.generateFilteredLike.bind(this);
  }

  handleFilterEqualLessGreaterClick(e) {
    let { filtertable, filtertype } = e.target.dataset;
    if (filtertype === 'less' || filtertype === 'greater') {
      filtertype = `${filtertype}Than`;
    }
    this.props.removeFilterEqualLessGreater([filtertype, filtertable])
  }

  handleFilterNotLikeClick(e) {
    let { filtertable, filtertype, filtervalue } = e.target.dataset;
    this.props.removeFilterNotLike([filtertype, filtertable, filtervalue]);
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
      <Filters
        filterSymbol={filterSymbols[filterType]}
        filterType={filterType}
        filterValues={this.props.selected[filterValuesType]}
        handleTargetClick={this.handleFilterEqualLessGreaterClick}
        key={i} />
    )
  }

  generateFilteredNot(tableRecord, i) {
    return (
      <FiltersNotLike
        filterSymbol='NOT ='
        filterTableRecord={tableRecord}
        filterType='not'
        filterValues={this.props.selected.not[tableRecord]}
        handleTargetClick={this.handleFilterNotLikeClick}
        key={i} />
    )
  }

  generateFilteredLike(tableRecord, i) {
    return (
      <FiltersNotLike
        filterSymbol='LIKE'
        filterTableRecord={tableRecord}
        filterType='like'
        filterValues={this.props.selected.like[tableRecord]}
        handleTargetClick={this.handleFilterNotLikeClick}
        key={i} />
    )
  }

  //renders all selected filters
  render() {
    const equalLessGreaterArr = ['equal', 'less', 'greater'];
    const notArr = Object.keys(this.props.selected.not);
    const likeArr = Object.keys(this.props.selected.like);

    return (
      <span className='console-filtered'>
        {equalLessGreaterArr.map(this.generateFilteredEqualLessGreater)}
        {notArr.map(this.generateFilteredNot)}
        {likeArr.map(this.generateFilteredLike)}
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
  { removeFilterEqualLessGreater,
    removeFilterNotLike })(SelectedTablesContainer);
