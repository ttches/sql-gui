import React, { Component } from 'react';


export default class FavoritesTabs extends Component {
  render() {

    const { onFavoriteClick, tabType } = this.props;

    function renderFavorites(favorite, i) {
      return (
        <div className={tabType} key={i}>
          <div onClick={onFavoriteClick}>
            {favorite}</div>
          <button onClick={ onFavoriteClick } data-tab={favorite}>x</button>
        </div>
      )

    }

    return (
      <div>{this.props.favorites.map(renderFavorites)}</div>
    )
  }
}
