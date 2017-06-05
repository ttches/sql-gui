import React, { Component } from 'react';

export default class FiltersIn extends Component {
  render() {
    ////console.log(`${this.props.tableRecord} in ${this.props.variable}`)
    return (
      <span>
        <div style={{display: 'inline-block'}}
          className={this.props.filterType}
          title='Remove'
          onClick={this.props.handleTargetClick}
          data-filtertype={this.props.filterType}>
          {`${this.props.tableRecord} IN ${this.props.variable.toUpperCase()}`}
        </div>
      </span>
    );
  }
}
