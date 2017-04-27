import React, { Component } from 'react';

import TableTabsContainer from './containers/TableTabsContainer';
import RecordsSelectContainer from './containers/RecordsSelectContainer';
import SelectedTablesContainer from './containers/SelectedTablesContainer';

class App extends Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <TableTabsContainer />
        <div style={{display: 'flex', flexFlow: 'row wrap', width: '80%'}}>
          <div className='console'>Console Placeholder</div>
          <SelectedTablesContainer />
          <div className='console-filtered'>Filtered...</div>
          <RecordsSelectContainer />
        </div>
      </div>
    );
  }
}

export default App;
