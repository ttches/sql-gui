import React, { Component } from 'react';

export default class Records extends Component {
  render() {

    const { selectedTab, handleToggle, recordType,
    checkRecordSelectedOrFiltered } = this.props;

    function generateRecordButtons(record, i) {
      //formats as TableName.RecordName
      let tableRecord = `${selectedTab}.${record}`
      return (
        <div key={i}
          className={`record-button ${(checkRecordSelectedOrFiltered(tableRecord))
            ? `record-button-${recordType}`
            : ''}`}
          data-record={tableRecord}
          onClick={handleToggle}>{record}
        </div>
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
