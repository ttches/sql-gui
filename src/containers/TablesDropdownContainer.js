import React, { Component } from 'react';
import { connect } from 'react-redux';

class TablesDropdownContainer extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected
  };
}

export default connect(mapStateToProps)(TablesDropdownContainer);
