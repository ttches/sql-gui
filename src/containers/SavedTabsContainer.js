import React, { Component } from 'react';
import { connect } from 'react-redux';

import SavedTabs from '../components/SavedTabs';
import { removeSaved, injectSavedState } from '../actions/index';

class SavedTabsContainer extends Component {
  constructor(props){
    super(props);
    this.handleSavedClick = this.handleSavedClick.bind(this);
    this.handleRemoveSavedClick = this.handleRemoveSavedClick.bind(this);
}


handleSavedClick(e) {
  const saved = this.props.saved[e.target.dataset.tab];
  this.props.injectSavedState(saved)
}

handleRemoveSavedClick(e) {
  const saved = e.target.dataset.tab;
  this.props.removeSaved(saved);
}

  render() {
    return (
      <div>
        <SavedTabs
          onSavedClick={this.handleSavedClick}
          onRemoveSavedClick={this.handleRemoveSavedClick}
          saved={Object.keys(this.props.saved)}
          tabType='saved-tab' />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    saved: state.saved,
    targets: state.selected
  };
}

export default connect(mapStateToProps,
  { removeSaved, injectSavedState })(SavedTabsContainer);
