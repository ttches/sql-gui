import React, { Component } from 'react';

import FavoritesTabsContainer from './containers/FavoritesTabContainer';
import FilteredTablesContainer from './containers/FilteredTablesContainer';
import RecordsSelectContainer from './containers/RecordsSelectContainer';
import SavedTabsContainer from './containers/SavedTabsContainer';
import SelectedTablesContainer from './containers/SelectedTablesContainer';
import TableTabsContainer from './containers/TableTabsContainer';
import Console from './containers/ConsoleContainer';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='left-panel'>
          <TableTabsContainer />
          <FavoritesTabsContainer />
          <SavedTabsContainer />
        </div>
        <div className='main-container'>
          <Console />
          <SelectedTablesContainer />
          <FilteredTablesContainer />
          <RecordsSelectContainer />
        </div>
      </div>
    );
  }
}

export default App;
