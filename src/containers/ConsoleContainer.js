import React, { Component } from 'react';
import { connect } from 'react-redux';

import Console from '../components/Console';
import { addFavorite, addSaved } from '../actions/index';

class ConsoleContainer extends Component {
  constructor(props) {
    super(props);
    this.checkIfTablesSelected = this.checkIfTablesSelected.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.renderSQLScript = this.renderSQLScript.bind(this);
    this.renderEqualLessGreater = this.renderEqualLessGreater.bind(this);
    this.renderNot = this.renderNot.bind(this);
    this.renderLike = this.renderLike.bind(this);
  }
  //This is all done in strings because the styling was difficult with multiple arrays
  renderSQLScript(selected) {
    if (this.props.selected.targets < 1) {
      return `<span>Add a table and selected a record to create SQL code</span>`
    }
    return (
      `<div>
        <div>${this.renderTargets(selected)}</div>
        <div>${this.renderTables(selected)}</div>
        <div>${this.renderFilters(selected) || ''}</div>
      </div>`
    )
  }

  renderTargets(selected) {
    return (
      `<span>
        <span class='keyword'>SELECT </span>
        ${selected.targets.join(', ')}
      </span>`
    )
  }

  renderTables(selected) {
    return (
      `<span>
        <span class='keyword'>FROM </span>
        ${this.consolidateSelectedTables(selected)}
      </span>`
    )
  }

  //This removes duplicate Tables so they don't appear more than once in FROM
  consolidateSelectedTables(selected) {
    let tables = Array.from(new Set(selected.targets
      .map((tableRecord) => {
      tableRecord = tableRecord.slice(0, tableRecord.indexOf('.'))
      return tableRecord
    })));
    return tables.join(', ');
  }

  renderFilters(selected) {
    let { equal, lessThan, greaterThan, not, like } = selected;
    //Determines whether any filters exist
    const filterNumber = [equal, lessThan, greaterThan, not, like]
      .reduce((total, filter) => {
        return total + Object.keys(filter).length
      }, 0);
    //If there are no filters, do not try to add them.
    if (filterNumber) {
      //Render an array of equal, lessThan, greaterThan filters
      let equalLessGreaterArr = ['equal', 'lessThan', 'greaterThan'];
      equalLessGreaterArr =
        equalLessGreaterArr.map(this.renderEqualLessGreater)

      let notArr = Object.keys(selected.not);
      notArr = notArr.map(this.renderNot)

      let likeArr = Object.keys(selected.like);
      likeArr = likeArr.map(this.renderLike);

    //flatten array of filters and removes blanks
      let filterOutput = [...equalLessGreaterArr, ...notArr, ...likeArr,
      ...this.props.selected.link]
        .filter((filter) => filter !== '');

      filterOutput = [].concat(...filterOutput);
      console.log(filterOutput);
      return (
        `<span>
          <span class='keyword'>WHERE </span>
          ${filterOutput.join(`<span class='keyword'> AND </span>`)}
        </span>`
      )
    }
  }

  // I had this before I switched to strings. This I could do in JSX
  // renderAnd(filterValue, i) {
  //   if (i === 0) {
  //     return (
  //       <span key={i}>${filterValue}</span>
  //     )
  //   }
  //   return (
  //     <span key={i}><span className='keyword'> AND </span>${filterValue}</span>
  //   )
  // }

  renderEqualLessGreater(filter) {
    const symbols = {equal: '=', lessThan: '<', greaterThan: '>'};
    return Object.keys(this.props.selected[filter]).map((tableRecord) => {
      return `${tableRecord} ${symbols[filter]} ${this.props.selected[filter][tableRecord]}`
    })
  }

  renderNot(filterTableRecord) {
    let notArr = this.props.selected.not[filterTableRecord]
    notArr = notArr.map((filter) => {
      return `<span class='keyword'>NOT </span>${filterTableRecord} = ${filter}`
    });
    return notArr;
  }

  renderLike(filterTableRecord) {
    let likeArr = this.props.selected.like[filterTableRecord]
    likeArr = likeArr.map((filter) => {
      return `${filterTableRecord} <span class='keyword'>LIKE </span>
       '${filter.replace(/'/g, "%")}'`
    });
    return likeArr;
  }

  handleCopyClick() {
    let consoleWindow = document.querySelector('.console');
    //Seems this is necessary to fix an error in chrome
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(consoleWindow);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  //Saved and favorite have many similarities that I will eventually reduce into a single function
  handleFavoriteClick() {
    if (!(this.checkIfTablesSelected(this.props.selected.targets))) return alert('Records must be selected to save a script');
    var favoriteName = window.prompt("What would you like to name this script?").toLowerCase();
    if (favoriteName === null) return;
    if (Object.keys(this.props.saved).some((key) => {
      return key === favoriteName;
    })) {
      return window.alert('Saved names must not match saved names');
    }
    while (favoriteName.length < 1 || favoriteName.length > 50) {
      favoriteName = window.prompt("The name must be between 1 and 50 characters");
    }
    this.props.addFavorite(favoriteName, this.props.selected);
  }

  handleSaveClick() {
    if (!(this.checkIfTablesSelected(this.props.selected.targets))) return alert('Records must be selected to save a script');
    var savedName = window.prompt("What would you like to name this script?").toLowerCase();
    if (savedName === null) return;
    if (Object.keys(this.props.favorites).some((key) => {
      return key === savedName;
    })) {
      return window.alert('Saved names must not match favorited names');
    }
    while (savedName.length < 1 || savedName.length > 50) {
      savedName = window.prompt("The name must be between 1 and 50 characters");
    }
    this.props.addSaved(savedName, this.props.selected);
  }

  checkIfTablesSelected(targets) {
    return targets.length > 0
  }


  render() {

    return (
      <Console
        script={this.renderSQLScript(this.props.selected)}
        onCopyClick={this.handleCopyClick}
        onFavoriteClick={this.handleFavoriteClick}
        onSaveClick={this.handleSaveClick}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    saved: state.saved,
    selected: state.selected,
  };
}

export default connect(mapStateToProps, { addFavorite, addSaved })(ConsoleContainer);
