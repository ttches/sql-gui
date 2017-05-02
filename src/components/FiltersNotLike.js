import React, { Component } from 'react';

export default class FiltersNotLike extends Component {
  render() {

    const { handleTargetClick, filterType,
      filterSymbol, filterTableRecord } = this.props;

    function mapFilters(filterValue, i) {
      return (
        <div style={{display: 'inline-block'}}
          className={filterType}
          key={i}
          alt='Remove'
          onClick={handleTargetClick}
          data-filtertable={filterTableRecord}
          data-filtertype={filterType}
          data-filtervalue={filterValue}
          >
          {`${filterTableRecord} ${filterSymbol} ${filterValue}`}
        </div>
      )
    }

    return (
      <span>
        {this.props.filterValues.map(mapFilters)}
      </span>
    );
  }
}
