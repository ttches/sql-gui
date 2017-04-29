import React, { Component } from 'react';
import { connect } from 'react-redux';

import Records from '../components/Records';
import { toggleSelectedRecord,
  deselectAllRecords, selectAllRecords} from '../actions/index';

class RecordsSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRecordFilterChange = this.handleRecordFilterChange.bind(this);
    this.handleSelectedRecordsToggle = this.handleSelectedRecordsToggle.bind(this);
    this.isRecordSelectedOrFiltered = this.isRecordSelectedOrFiltered.bind(this);
    this.setStateSelectedOrFiltered = this.setStateSelectedOrFiltered.bind(this);
    this.toggleSelectAllRecords = this.toggleSelectAllRecords.bind(this);
    this.state = {
      viewRecords: 'selected'
    };
  }

  handleRecordFilterChange(e) {
    const tableRecord = e.target.dataset.filterselect;
    const value = e.target.value;
    document.querySelector(`[data-record="${tableRecord}"]`).classList
      .remove('filter-not', 'filter-greater', 'filter-less',
        'filter-like');
    document.querySelector(`[data-record="${tableRecord}"]`).classList
      .add(`filter-${value}`)
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
    this.setState({
      viewRecords: e.target.dataset.tab
    });
  }

  toggleSelectAllRecords() {
    const table = this.props.selected.selectedTab;
    const records = this.props.SQLData[table];
    const tableRecords = records.map((record) => `${table}.${record}`);
    //Is every record in this table selected?
    (tableRecords.every((record) => {
      return this.props.selected.targets.indexOf(record) > -1
    })) ? this.props.deselectAllRecords(table)
        : this.props.selectAllRecords(tableRecords)
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
        <button
          onClick={this.toggleSelectAllRecords}
          style={{display: (this.state.viewRecords === 'selected')
          ? 'block' : 'none'}}>Select all
        </button>
       <Records
          checkRecordSelectedOrFiltered={this.isRecordSelectedOrFiltered}
          filtered={this.state.viewRecords === 'filtered'}
          handleToggle={(this.state.viewRecords === 'selected')
            ? this.handleSelectedRecordsToggle
            : ''}
          onRecordFilterChange={this.handleRecordFilterChange}
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

export default connect(mapStateToProps, { toggleSelectedRecord,
  selectAllRecords, deselectAllRecords })(RecordsSelectContainer);
