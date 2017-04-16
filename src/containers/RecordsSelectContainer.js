import React, { Component } from 'react';
import { connect } from 'react-redux';

import Records from '../components/Records';

class RecordsSelectContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewRecords: 'selected'
    };
  }

  render() {

    console.log(this.props.SQLData[this.props.selected.selectedTab]);

    return (
      <div style={{width: '100%'}}>
        <div className="records-tabs">
          <div className="selected-records-tab">Selected Records</div>
          <div className="filtered-records-tab">Filtered Records</div>
        </div>
       <Records
        recordType={this.state.viewRecords}
        recordList={this.props.SQLData[this.props.selected.selectedTab]}
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

export default connect(mapStateToProps)(RecordsSelectContainer);
