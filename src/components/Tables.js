import React, { Component } from 'react';

export default class Tables extends Component {
  render() {

    const { handleTargetClick } = this.props;

    function mapTargets(target, i) {
      return (
        <span className='target' key={i} alt='Remove'
          onClick={handleTargetClick}>
          {target}
        </span>
      )
    }

    return (
      <div className='console-selected'>
        {this.props.targets.map(mapTargets)}
      </div>
    );
  }
}
