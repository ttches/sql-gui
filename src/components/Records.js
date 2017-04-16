import React, { Component } from 'react';

export default class Records extends Component {
  render() {

    function generateRecordButtons(record, i) {
      return (
        <div key={i}
          className='record-button'>{record}</div>
      );
    }

    if (this.props.recordList) {
      return (
        <div className='records'>
          <div>{this.props.recordList.map(generateRecordButtons)}</div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}
