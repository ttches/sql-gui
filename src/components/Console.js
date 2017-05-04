import React, { Component } from 'react';

export default class Console extends Component {
  render() {

    function handleClick() {
      console.log(document.querySelector('.console').innerText)
    }
    console.log(this.props.script);
    return (
      <div className='console'>
        <div dangerouslySetInnerHTML={{
          __html: this.props.script
        }} />

        <button onClick={handleClick}>Click</button>
      </div>

    );
  }
}
