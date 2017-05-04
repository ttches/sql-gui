import React, { Component } from 'react';

export default class Console extends Component {
  render() {

    function handleClick() {
      console.log(document.querySelector('.console').innerText)
    }
    console.log(this.props.script);
    return (
      <div style={{width: '100%', display: 'inline-flex'}}>
        <div className='console'>
          <div dangerouslySetInnerHTML={{
            __html: this.props.script
          }} />
        </div>
        <div className='console-buttons'>
          <button onClick={handleClick}>Copy</button>
          <button onClick={handleClick}>Favorite</button>
          <button onClick={handleClick}>Remember</button>
        </div>
      </div>

    );
  }
}
