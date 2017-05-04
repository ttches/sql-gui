import React, { Component } from 'react';
import { connect } from 'react-redux';

import Console from '../components/Console';
import { addFavorite } from '../actions/index';

class ConsoleContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.renderSQLScript = this.renderSQLScript.bind(this);
    this.renderEqualLessGreater = this.renderEqualLessGreater.bind(this);
    this.renderNot = this.renderNot.bind(this);
    this.renderLike = this.renderLike.bind(this);
  }
  //This is all done in strings because the styling was difficult with multiple arrays
  renderSQLScript() {
    if (this.props.selected.targets < 1) {
      return `<span>Add a table and selected a record to create SQL code</span>`
    }
    return (
      `<div>
        <div>${this.renderTargets()}</div>
        <div>${this.renderTables()}</div>
        <div>${this.renderFilters() || ''}</div>
      </div>`
    )
  }

  renderTargets() {
    return (
      `<span>
        <span class='keyword'>SELECT </span>
        ${this.props.selected.targets.join(', ')}
      </span>`
    )
  }

  renderTables() {
    return (
      `<span>
        <span class='keyword'>FROM </span>
        ${this.consolidateSelectedTables()}
      </span>`
    )
  }

  //This removes duplicate Tables so they don't appear more than once in FROM
  consolidateSelectedTables() {
    let tables = Array.from(new Set(this.props.selected.targets
      .map((tableRecord) => {
      tableRecord = tableRecord.slice(0, tableRecord.indexOf('.'))
      return tableRecord
    })));
    return tables.join(', ');
  }

  renderFilters() {
    let { equal, lessThan, greaterThan, not, like } = this.props.selected;
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

      let notArr = Object.keys(this.props.selected.not);
      notArr = notArr.map(this.renderNot)

      let likeArr = Object.keys(this.props.selected.like);
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
    console.log(document.querySelector('.console').innerText)
    let consoleWindow = document.querySelector('.console');
    //Seems this is necessary to fix an error in chrome
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(consoleWindow);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  handleFavoriteClick() {
    var favoriteName = window.prompt("What would you like to name this script?");
    this.props.addFavorite(favoriteName, this.props.selected);
  }


  render() {

    return (
      <Console
        script={this.renderSQLScript()}
        onCopyClick={this.handleCopyClick}
        onFavoriteClick={this.handleFavoriteClick}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.selected,
  };
}

export default connect(mapStateToProps, { addFavorite })(ConsoleContainer);
