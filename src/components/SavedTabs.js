import React, { Component } from 'react';


export default class SavedTabs extends Component {
  render() {

    const { onSavedClick, onRemoveSavedClick, tabType } = this.props;

    function renderSaved(saved, i) {
      return (
        <div className={`${tabType}`} key={i}>
          <div data-tab={saved} onClick={onSavedClick}>
            {saved}</div>
          <button onClick={ onRemoveSavedClick} data-tab={saved}>x</button>
        </div>
      )

    }

    return (
      <div>
        <div>{this.props.saved.map(renderSaved)}</div>
      </div>
    )
  }
}
