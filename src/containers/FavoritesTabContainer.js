import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoritesTabs from '../components/FavoritesTabs';
import { removeFavorite } from '../actions/index';

class FavoritesTabsContainer extends Component {
  constructor(props){
    super(props);
    this.handleDisplayToggle = this.handleDisplayToggle.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleRemoveFavoriteClick = this.handleRemoveFavoriteClick.bind(this);
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

handleRemoveFavoriteClick(e) {
  const favorite = e.target.dataset.tab;
  if (confirm(`Are you sure you want to remove ${favorite} from favorites?`)) {
    this.props.removeFavorite(favorite);
  }
}

  render() {

    if (this.state.buttonText === 'Hide Favorites') {
      return (
        <div>
          <FavoritesTabs
            onFavoriteClick={this.handleFavoriteClick}
            onRemoveFavoriteClick={this.handleRemoveFavoriteClick}
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

export default connect(mapStateToProps, {removeFavorite})(FavoritesTabsContainer);
