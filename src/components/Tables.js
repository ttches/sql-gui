import React, { Component } from 'react';

export default class Tables extends Component {
  render() {

    const { handleTargetClick, filterType } = this.props;

    function mapTargets(target, i) {
      return (
        <div className={filterType} style={{display: 'inline-block'}} key={i} alt='Remove'
          onClick={handleTargetClick}>
          {target}
        </div>
      )
    }

    return (
      <span className='console-selected'>
        {this.props.targets.map(mapTargets)}
      </span>
    );
  }
}
