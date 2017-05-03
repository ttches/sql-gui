import React, { Component } from 'react';

export default class Console extends Component {
  render() {

    function handleClick() {
      console.log(document.querySelector('.console').innerText)
    }

    return (
      <div className='console'>{this.props.script}
        <button onClick={handleClick}>Click</button>
      </div>

    );
  }
}
