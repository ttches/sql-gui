import React, { Component } from 'react';
import { connect } from 'react-redux';

import Records from '../components/Records';
import { toggleSelectedRecord } from '../actions/index';

class RecordsSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSelectedRecordsToggle = this.handleSelectedRecordsToggle.bind(this);
    this.isRecordSelectedOrFiltered = this.isRecordSelectedOrFiltered.bind(this);
    this.setStateSelectedOrFiltered = this.setStateSelectedOrFiltered.bind(this);
    this.state = {
      viewRecords: 'selected'
    };
  }

  //Toggles a selected record as a target or not as a target in redux state
  handleSelectedRecordsToggle(e) {
    this.props.toggleSelectedRecord(e.target.dataset.record);
  }

  //If we're looking at selected table, will see if the record is in targets, otherwise will see if the reord is being filtered.
  isRecordSelectedOrFiltered(record) {
    if (this.state.viewRecords === 'selected') {
      return (this.props.selected.targets.indexOf(record) > -1)
    }
  }

  setStateSelectedOrFiltered(e) {
    console.log(e)
    this.setState({
      viewRecords: e.target.dataset.tab
    });
  }

  render() {
    //If there's a selected table, sort its records
    const sortedRecordList = (this.props.selected.selectedTab.length > 0)
      ? this.props.SQLData[this.props.selected.selectedTab].sort()
      : '';

    return (
      <div style={{width: '100%'}}>
        <div className="records-tabs">
          <div className={`selected-records-tab
              ${(this.state.viewRecords === 'selected')
                ? 'focused-record-tab'
                : 'unfocused-record-tab'}`}
              onClick={this.setStateSelectedOrFiltered}
              data-tab='selected'>
            Selected Records
          </div>
          <div className={`filtered-records-tab
            ${(this.state.viewRecords === 'filtered')
              ? 'focused-record-tab'
              : 'unfocused-record-tab'}`}
            onClick={this.setStateSelectedOrFiltered}
            data-tab='filtered'>
            Filtered Records
          </div>
        </div>
       <Records
          checkRecordSelectedOrFiltered={this.isRecordSelectedOrFiltered}
          filtered={this.state.viewRecords === 'filtered'}
          handleToggle={(this.state.viewRecords === 'selected')
            ? this.handleSelectedRecordsToggle
            : ''}
          recordType={this.state.viewRecords}
          recordList={sortedRecordList}
          selectedTab={this.props.selected.selectedTab}
          targets={this.props.selected.targets}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    selected: state.selected,
    SQLData: state.SQLData
  };
}

export default connect(mapStateToProps, {toggleSelectedRecord})(RecordsSelectContainer);
