import React, { Component } from 'react';

export default class FiltersNotLike extends Component {
  render() {

    const { handleTargetClick, filterType, filterValues,
      filterSymbol } = this.props;

    function mapFilters(filterTable, i) {
      return (
        <div style={{display: 'inline-block'}}
          className={filterType}
          key={i}
          alt='Remove'
          onClick={handleTargetClick}
          data-filtertable={filterTable}
          data-filtertype={filterType}
          >
          {`${filterTable} ${filterSymbol} ${filterValues[filterTable]}`}
        </div>
      )
    }
    console.log('not, like', this.props.filterValues);


    return (
      <span>

      </span>
    );
  }
}
