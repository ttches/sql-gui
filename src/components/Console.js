import React, { Component } from 'react';

export default class Console extends Component {
  render() {

    return (
      <div className='console'>{this.props.script}</div>
    );
  }
}
