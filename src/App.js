import React, { Component } from 'react';

import TableTabsContainer from './containers/TableTabsContainer';
import RecordsSelectContainer from './containers/RecordsSelectContainer';
import SelectedTablesContainer from './containers/SelectedTablesContainer';
import FilteredTablesContainer from './containers/FilteredTablesContainer';
import Console from './containers/ConsoleContainer';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='left-panel'>
          <TableTabsContainer />
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
