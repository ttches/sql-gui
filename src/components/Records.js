import React, { Component } from 'react';

export default class Records extends Component {
  render() {

    const { selectedTab, handleToggle, recordType,
    checkRecordSelectedOrFiltered, onRecordFilterChange,
    onSubmitFilter } = this.props;

    function generateRecordButtonsSelected(record, i) {
      //formats as TableName.RecordName
      let tableRecord = `${selectedTab}.${record}`
      return (
        <div key={i}
          className={`record-button ${(checkRecordSelectedOrFiltered(tableRecord))
            ? `record-button-${recordType}`
            : ''}`}
          data-record={tableRecord}
          onClick={handleToggle}>
          {record}
        </div>
      );
    }

    function generateRecordButtonsFiltered(record, i) {
      //formats as TableName.RecordName
      let tableRecord = `${selectedTab}.${record}`
      return (
        <div key={`${i}-${record}`}
          className={`record-button`}
          data-record={tableRecord} >
          {record}
          <div style={{display: 'block'}}>
            <select data-filtertype={tableRecord}
                onChange={onRecordFilterChange}>
              <option value='equal'>Equal to</option>
              <option value='not'>Not equal to</option>
              <option value='greater'>Greater than</option>
              <option value='less'>Less than</option>
              <option value='like'>Like</option>
              <option title='Format as Table.Record' value='link'>Link to record</option>
              <option title='Enter a favorite or stash name' value='in'>In</option>
            </select>
          </div>
          <input type='text' data-filterinput={tableRecord}
            onKeyDown={onSubmitFilter}></input>
        </div>
      );
    }

    if (this.props.recordList) {
      return (
        <span className='records'>
          <span>
            {this.props.recordList.map((this.props.filtered)
            ? generateRecordButtonsFiltered
            : generateRecordButtonsSelected )}
          </span>
        </span>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}
