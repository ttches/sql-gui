import { cloneDeep } from 'lodash'

import { UPDATE_TABLE_TABS, CLOSE_TABLE_TAB,
  ADD_TABLE_TAB, UPDATE_SELECTED_TABLE_TAB,
  TOGGLE_SELECTED_RECORD, REMOVE_TARGET,
  SELECT_ALL_RECORDS, DESELECT_ALL_RECORDS,
  ADD_EQUAL_LESS_GREATER, ADD_FILTER_NOT_LIKE,
  REMOVE_EQUAL_LESS_GREATER, REMOVE_FILTER_NOT_LIKE,
  ADD_FILTER_LINK, REMOVE_FILTER_LINK,
  INJECT_SAVED_STATE, REMOVE_FILTER_IN, ADD_FILTER_IN,
  SELECT_MANY_RECORDS } from '../actions/index';

const INITIAL_STATE = {
  tables: ["ACCTCAT", "ACCTNUMS", "APPDET", "APPOINT", "APPOINTS", "ASSEMBLY", "BILLADDR", "CALLHIST", "CARD", "CATEGORY", "CENTRAL", "CODES", "CONTACTS", "CONTCAT", "CONTLOC", "CONTMAST", "CONTRACT", "CONTRCTS", "CONTYPE", "CONVERSE", "CORRLOG", "COSTCODE", "CREDACT", "CREDHEAD", "CUSTATUS", "CUSTOMER", "DBA", "DEALER", "DEALINV", "DEFAULTS", "DETMEMO", "DISPATCH", "EDEALINV", "EDEFAULT", "EHTM", "EHTMTIC", "EMAILINV", "EQUIPMNT", "ETECH", "ETICKET", "FORMS", "GLTABLE", "HELPDESK", "IMAGES", "INCOME", "INVDET", "INVMEMO", "INVOICE", "INVREC", "LABELS", "LETTER", "LOCATION", "LOCINV", "LOGTYPE", "MASSYS", "MASTSYS", "MERGELST", "MULTICOM", "PARTCAT", "PARTDESC", "PARTS", "PARTSBUY", "PARTSLVL", "PARTYPE", "PCONTRCT", "PHONELBL", "PHRASE", "PLEVELS", "PODETAIL", "POHEAD", "POMEMO", "POPAPPT", "POPBAL", "POPCRED", "POPREM", "POSITIO", "POTITLE", "QUICKCAT", "QUICKSYS", "QUICKTMP", "RAPIDSYS", "RATES", "RECDET", "RECEIPTS", "RECHARGE", "RELATION", "REMARKS", "REMINDER", "REPAIR", "ROLODEX", "SCHEDULE", "SERVICE", "SPHRASE", "STOCKLOG", "SUBCAT", "SUPMERGE", "SUPPORT", "SXPHRASE", "SYSTEM", "TASKS", "TASKSTAT", "TAXTABLE", "TBEVENTS", "TBEXCLUD", "TBGROUP", "TBLIST", "TBLOG", "TBSYSTEM", "TBTMPL", "TBTMPLHD", "TECHS", "TEMPAPD", "TICKET", "TIMECARD", "TIMECAT", "TODO", "TRANSLOG", "TROUBLE", "TSAPTMNT", "TSCOUNT", "TSMDATA", "TSRECUR", "USER17", "USER18", "USER19", "USER20", "USERLOG", "VENDNAME", "VENDOR", "ZONEDEF1", "ZONEDEF2", "ZONEMAST", "ZONES", "ZONETYPE"],
  targets: [],
  tabs: ["CUSTOMER"],
  selectedTab: 'CUSTOMER',
  lessThan: {},
  greaterThan: {},
  equal: {},
  in: [],
  not: {}, //not and like will need to be key:[not, not]
  like: {},
  link: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    case UPDATE_TABLE_TABS:
      const oldTab = action.payload[0];
      const newTab = action.payload[1];
      let workingState = cloneDeep(state);
      const oldTabIndex = workingState.tabs.indexOf(oldTab);
      if (oldTabIndex === -1) {
        workingState.tabs.push(newTab);
      } else {
        workingState.tabs.splice(workingState.tabs.indexOf(oldTab), 1, newTab);
      }
      workingState.selectedTab = newTab;
      return workingState;

    case CLOSE_TABLE_TAB:
      workingState = cloneDeep(state);
      const closeTabIndex = workingState.tabs.indexOf(action.payload);
      if (closeTabIndex === -1) {
        return state;
      } else {
        //Remove everything selected by the closed table
        let reg = new RegExp(`^(${action.payload}\\.)`, 'i');
        if (workingState.in.indexOf(`${action.payload}.`)) workingState.in = [];
        if (workingState.link.indexOf(`${action.payload}.`)) workingState.link = [];
        workingState.tabs.splice(closeTabIndex, 1);
        workingState.targets = workingState.targets.filter((target) => {
          return !target.match(reg);
        });
        function deleteMatches(key, arr) {
          if (key.match(reg)) delete workingState[arr][key];
        }
        Object.keys(workingState.lessThan).map((key) => deleteMatches(key, 'lessThan'));
        Object.keys(workingState.greaterThan).map((key) => deleteMatches(key, 'greaterThan'));
        Object.keys(workingState.equal).map((key) => deleteMatches(key, 'equal'));
        Object.keys(workingState.not).map((key) => deleteMatches(key, 'not'));
        Object.keys(workingState.like).map((key) => deleteMatches(key, 'like'));



        if (workingState.selectedTab === action.payload) {
          workingState.selectedTab = '';
        }
        return workingState;
      }

    case ADD_TABLE_TAB:
      workingState = cloneDeep(state);
      workingState.tabs.push(action.payload);
      workingState.selectedTab = action.payload;
      return workingState;

    case UPDATE_SELECTED_TABLE_TAB:
      workingState = cloneDeep(state);
      workingState.selectedTab = action.payload;
      return workingState;

    case TOGGLE_SELECTED_RECORD:
      workingState = cloneDeep(state);
      const selectedRecordToToggle = action.payload;
      const targetsIndex = workingState.targets.indexOf(selectedRecordToToggle);
      if (targetsIndex === -1) {
        workingState.targets.push(selectedRecordToToggle);
      } else {
        workingState.targets.splice(targetsIndex, 1);
      }
      return workingState;

    case REMOVE_TARGET:
      workingState = cloneDeep(state);
      workingState.targets = workingState.targets.filter((target) => {
        return target !== action.payload;
      });
      return workingState;

    //I formatted this to take over the work of DESELECT_ALL_RECORDS. I haven't removed DESELECT yet because I don't have time to test right now.
    case SELECT_ALL_RECORDS:
      workingState = cloneDeep(state);
      let table = action.payload;
      let toggle = (workingState.targets.indexOf(`${table}.*`) > -1)
        ? 'off' : 'on';
      let regTable = new RegExp(`^(${table}\\.)`, 'i');
      workingState.targets = workingState.targets.filter((target) => {
        return !target.match(regTable);
      });
      if (toggle === 'on') {
        workingState.targets.push(`${table}.*`)
      }
      return workingState;

    case SELECT_MANY_RECORDS:
      workingState = cloneDeep(state);
      table = action.payload[0];
      let tableRecords = action.payload[1];
      regTable = new RegExp(`^(${table}\\.)`, 'i');
      workingState.targets = workingState.targets.filter((target) => {
        return !target.match(regTable);
      });
      tableRecords.forEach((record) => {
        workingState.targets.push(`${table}.${record}`)
      });
      return workingState;

    case DESELECT_ALL_RECORDS:
      workingState = cloneDeep(state);
      const reg = new RegExp(`^(${action.payload}\\.)`, 'i');
      workingState.targets = workingState.targets.filter((target) => {
        return !target.match(reg);
      });
      return workingState;

    case ADD_EQUAL_LESS_GREATER:
      workingState = cloneDeep(state);
      let filterType = action.payload[0];
      let tableRecord = action.payload[1];
      let filterValue = action.payload[2];
      if (filterType === 'greater' || filterType === 'less') {
        filterType = `${filterType}Than`;
      }
      workingState[filterType][tableRecord] = filterValue;
      return workingState;

    case REMOVE_EQUAL_LESS_GREATER:
      workingState = cloneDeep(state)
      filterType = action.payload[0];
      tableRecord = action.payload[1];
      delete workingState[filterType][tableRecord];
      return workingState;

    case ADD_FILTER_NOT_LIKE:
      workingState = cloneDeep(state)
      filterType = action.payload[0];
      tableRecord = action.payload[1];
      filterValue = action.payload[2];
      var tableRecordArray = workingState[filterType][tableRecord];
      //If the table record exists but filter value does not, push filter value
      if (tableRecordArray) {
        if (tableRecordArray.indexOf(filterValue) === -1) {
          tableRecordArray.push(filterValue);
        } else {
          return state;
        }
      } else {
      //Else, create an array with the filterValue
        workingState[filterType][tableRecord] = [filterValue];
      }
      return workingState;

    case REMOVE_FILTER_NOT_LIKE:
      workingState = cloneDeep(state)
      filterType = action.payload[0];
      tableRecord = action.payload[1];
      filterValue = action.payload[2];
      workingState[filterType][tableRecord] =
      workingState[filterType][tableRecord].filter((value) => {
        return value !== filterValue
      });
      //If the key's array becomes empty after the filter, remove it
      Object.keys(workingState[filterType]).forEach((tableRecord) => {
        if (workingState[filterType][tableRecord].length < 1) {
          delete workingState[filterType][tableRecord];
        }
      })
      return workingState;

    case ADD_FILTER_LINK:
      workingState = cloneDeep(state);
      workingState.link.push(`${action.payload[0]} = ${action.payload[1]}`);
      return workingState;

    case REMOVE_FILTER_LINK:
      workingState = cloneDeep(state);
      workingState.link = [];
      return workingState;

    case INJECT_SAVED_STATE:
      workingState = cloneDeep(action.payload)
      delete workingState.script;
      return workingState;

    case REMOVE_FILTER_IN:
      workingState = cloneDeep(state);
      workingState.in = [];
      return workingState;

    case ADD_FILTER_IN:
      workingState = cloneDeep(state);
      workingState.in = action.payload;
      return workingState

    default:
      return state;
  }
}
