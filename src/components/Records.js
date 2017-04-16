import React, { Component } from 'react';

export default class Records extends Component {
  render() {

    return (
      <div className={`records-${this.props.recordType}`}>
        <div>{this.props.recordList}</div>
      </div>
    );
  }
}
