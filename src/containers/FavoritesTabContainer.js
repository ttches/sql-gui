import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoritesTabs from '../components/FavoritesTabs';
import { closeTableTab } from '../actions/index';

class FavoritesTabsContainer extends Component {
  constructor(props){
    super(props);
    this.handleDisplayToggle = this.handleDisplayToggle.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.state = {
      buttonText: 'Show Favorites'
    }
}

handleDisplayToggle() {
  this.setState({
    buttonText:
    (this.state.buttonText === 'Show Favorites')
      ? 'Hide Favorites' : 'Show Favorites'
  })
}

handleFavoriteClick(e) {
  console.log(e);
}

  render() {

    if (this.state.buttonText === 'Hide Favorites') {
      return (
        <div>
          <FavoritesTabs
            onFavoriteClick={this.handleFavoriteClick}
            favorites={Object.keys(this.props.favorites)}
            tabType='favorite-tab' />
          <button onClick={this.handleDisplayToggle}>
            {this.state.buttonText}
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.handleDisplayToggle}>
            {this.state.buttonText}
          </button>
        </div>
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    favorites: state.favorites
  };
}

export default connect(mapStateToProps, {closeTableTab})(FavoritesTabsContainer);
