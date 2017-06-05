import React, { Component } from 'react';
import { connect } from 'react-redux';

import Records from '../components/Records';
import { toggleSelectedRecord,
  deselectAllRecords, selectAllRecords,
  addFilterEqualLessGreater, addFilterNotLike,
  addFilterLink, addFilterIn, selectManyRecords } from '../actions/index';

class RecordsSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.handleRecordFilterChange = this.handleRecordFilterChange.bind(this);
    this.handleSelectedRecordsToggle = this.handleSelectedRecordsToggle.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.isRecordSelectedOrFiltered = this.isRecordSelectedOrFiltered.bind(this);
    this.setStateSelectedOrFiltered = this.setStateSelectedOrFiltered.bind(this);
    this.toggleSelectAllRecords = this.toggleSelectAllRecords.bind(this);
    this.state = {
      viewRecords: 'selected'
    };
  }

  handleRecordFilterChange(e) {
    const tableRecord = e.target.dataset.filtertype;
    const value = e.target.value;
    document.querySelector(`[data-record="${tableRecord}"]`).classList
      .remove('filter-not', 'filter-greater', 'filter-less',
        'filter-like', 'filter-link', 'filter-in');
    document.querySelector(`[data-record="${tableRecord}"]`).classList
      .add(`filter-${value}`)
  }

  //Toggles a selected record as a target or not as a target in redux state
  handleSelectedRecordsToggle(e) {
    const tableRecord = (e.target.dataset.record);
    const table = (e.target.dataset.table);
    if (this.props.selected.targets.indexOf(`${table}.*`) > -1) {
      let record = tableRecord.slice(tableRecord.indexOf('.') + 1);
      let tableRecords = this.props.SQLData[table].filter((dataRecord) => {
        return dataRecord !== record;
      });
      return this.props.selectManyRecords([table, tableRecords])
    }
    this.props.toggleSelectedRecord(e.target.dataset.record);
  }

  handleAddFilter(e) {
    if (e.keyCode !== 13) return;
    const periodIndex = e.target.value.indexOf('.');
    const splitValue = (periodIndex > -1) ? e.target.value.toUpperCase().split('.') : null;
    const tableRecord = e.target.dataset.filterinput;
    const filterType = document.querySelector(`[data-filtertype="${tableRecord}"]`).value;
    //If the input is a tabe.record variable, don't put quotes around it
    ////console.log((splitValue))
    const filterValue =
    ((splitValue) && (this.props.SQLData[splitValue[0]])
      && this.props.SQLData[splitValue[0]].indexOf(splitValue[1]) > -1)
        ? e.target.value.toUpperCase()
        : `'${this.formatDate(e.target.value)}'`;
    if(filterType === 'equal' || filterType === 'less' || filterType === 'greater') {
      this.props.addFilterEqualLessGreater([filterType, tableRecord, filterValue]);
    } else if(filterType === 'not' || filterType === 'like') {
      this.props.addFilterNotLike([filterType, tableRecord, filterValue]);
    } else if(filterType === 'link') {
      if (filterValue.indexOf('.') === -1) {
        alert('Please user format TABLE.RECORD')
      } else {
        this.props.addFilterLink([tableRecord, filterValue.toUpperCase()]);
      }
    } else if(filterType === 'in') {
      let lowerCaseValue = e.target.value.toLowerCase();
      if (lowerCaseValue in this.props.saved) {
        this.props.addFilterIn([tableRecord, `saved.${lowerCaseValue}`,
        this.props.saved[lowerCaseValue].script]);
      } else if (lowerCaseValue in this.props.favorites) {
        this.props.addFilterIn([tableRecord, `favorites.${lowerCaseValue}`,
        this.props.favorites[lowerCaseValue].script]);
      } else {
        return alert(`${e.target.value} not found in saved or favorites`);
      }
    } else {
      return;
    }
    e.target.value = '';
  }

  formatDate(filterValue) {
    const reg = new RegExp(/(\d{2}\/){2}\d{4}/);
    //If a date isn't entered, return filterValue
    if (!(filterValue.match(reg))) return filterValue
    const d0 = new Date('12/28/1800');
    const d1 = new Date(filterValue);
    //returns the amount of days since d0
    return ((d1 - d0) / 1000 / 60 / 60 / 24).toString();
  }

  //If we're looking at selected table, will see if the record is in targets, otherwise will see if the reord is being filtered.
  isRecordSelectedOrFiltered(record, table) {
    if (this.state.viewRecords === 'selected') {
      return (this.props.selected.targets.indexOf(record) > -1
      || this.props.selected.targets.indexOf(`${table}.*`) > -1)
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
    (this.props.selected.targets.indexOf(`${table}.*`) > -1
    || tableRecords.every((record) => {
      return this.props.selected.targets.indexOf(record) > -1
    })) ? this.props.deselectAllRecords(table)
        : this.props.selectAllRecords(table)
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
        <div className='records-container'>
          <span><button
            onClick={this.toggleSelectAllRecords}
            className='select-all-button'
            style={{display: (this.state.viewRecords === 'selected'
            && this.props.selected.selectedTab.length > 0)
            ? 'inline-block' : 'none'}}>Select all
          </button></span>
          <Records
            checkRecordSelectedOrFiltered={this.isRecordSelectedOrFiltered}
            filtered={this.state.viewRecords === 'filtered'}
            handleToggle={(this.state.viewRecords === 'selected')
            ? this.handleSelectedRecordsToggle
            : ''}
            onRecordFilterChange={this.handleRecordFilterChange}
            onSubmitFilter={this.handleAddFilter}
            onToggleFilter={this.handleToggleFilter}
            recordType={this.state.viewRecords}
            recordList={sortedRecordList}
            selectedTab={this.props.selected.selectedTab}
            targets={this.props.selected.targets}
          />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    saved: state.saved,
    selected: state.selected,
    SQLData: state.SQLData
  };
}

export default connect(mapStateToProps, { toggleSelectedRecord,
  selectAllRecords, deselectAllRecords,
  addFilterEqualLessGreater, addFilterNotLike,
  addFilterLink, addFilterIn, selectManyRecords })(RecordsSelectContainer);
