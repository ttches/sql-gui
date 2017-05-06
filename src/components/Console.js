import React, { Component } from 'react';

export default class Console extends Component {
  render() {

    return (
      <div style={{width: '100%', display: 'inline-flex'}}>
        <div className='console'>
          <div dangerouslySetInnerHTML={{
            __html: this.props.script
          }} />
        </div>
        <div className='console-buttons'>
          <button onClick={this.props.onCopyClick}
            title='Copy to clipboard'>
            Copy
          </button>
          <button onClick={this.props.onFavoriteClick}
            title='Save to local storage'>
            Favorite
          </button>
          <button onClick={this.props.onSaveClick}
            title='Temporarily save as a variable'>
            Save
          </button>
        </div>
      </div>

    );
  }
}
