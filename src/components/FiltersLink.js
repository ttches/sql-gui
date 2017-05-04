import React, { Component } from 'react';

export default class FiltersLink extends Component {
  render() {

    const { handleTargetClick, filterType } = this.props;

    function mapFilters(linkString) {
      return (
        <div style={{display: 'inline-block'}}
          className={filterType}
          alt='Remove'
          onClick={handleTargetClick}
          data-filtertype={filterType}
          >
          {linkString}
        </div>
      )
    }

    return (
      <span>
        {mapFilters(this.props.linkString)}
      </span>
    );
  }
}
