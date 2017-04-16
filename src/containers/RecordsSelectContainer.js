import React, { Component } from 'react';
import { connect } from 'react-redux';

import Records from '../components/Records';

class RecordsSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.generateRecords = this.generateRecords.bind(this);
  }

  generateRecords(table, i) {
    return <Records key={i}
      recordType='selected'
      recordList={this.props.SQLData[table]}
      />
    }

  render() {


    return (
      <div>
        {this.props.selected.tabs.map(this.generateRecords)}
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
