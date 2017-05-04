import { UPDATE_TABLE_TABS, CLOSE_TABLE_TAB,
  ADD_TABLE_TAB, UPDATE_SELECTED_TABLE_TAB,
  TOGGLE_SELECTED_RECORD, REMOVE_TARGET,
  SELECT_ALL_RECORDS, DESELECT_ALL_RECORDS,
  ADD_EQUAL_LESS_GREATER, ADD_FILTER_NOT_LIKE,
  REMOVE_EQUAL_LESS_GREATER, REMOVE_FILTER_NOT_LIKE,
  ADD_FILTER_LINK, REMOVE_FILTER_LINK } from '../actions/index';

const INITIAL_STATE = {
  tables: ["ACCTCAT", "ACCTNUMS", "APPDET", "APPOINT", "APPOINTS", "ASSEMBLY", "BILLADDR", "CALLHIST", "CARD", "CATEGORY", "CENTRAL", "CODES", "CONTACTS", "CONTCAT", "CONTLOC", "CONTMAST", "CONTRACT", "CONTRCTS", "CONTYPE", "CONVERSE", "CORRLOG", "COSTCODE", "CREDACT", "CREDHEAD", "CUSTATUS", "CUSTOMER", "DBA", "DEALER", "DEALINV", "DEFAULTS", "DETMEMO", "DISPATCH", "EDEALINV", "EDEFAULT", "EHTM", "EHTMTIC", "EMAILINV", "EQUIPMNT", "ETECH", "ETICKET", "FORMS", "GLTABLE", "HELPDESK", "IMAGES", "INCOME", "INVDET", "INVMEMO", "INVOICE", "INVREC", "LABELS", "LETTER", "LOCATION", "LOCINV", "LOGTYPE", "MASSYS", "MASTSYS", "MERGELST", "MULTICOM", "PARTCAT", "PARTDESC", "PARTS", "PARTSBUY", "PARTSLVL", "PARTYPE", "PCONTRCT", "PHONELBL", "PHRASE", "PLEVELS", "PODETAIL", "POHEAD", "POMEMO", "POPAPPT", "POPBAL", "POPCRED", "POPREM", "POSITIO", "POTITLE", "QUICKCAT", "QUICKSYS", "QUICKTMP", "RAPIDSYS", "RATES", "RECDET", "RECEIPTS", "RECHARGE", "RELATION", "REMARKS", "REMINDER", "REPAIR", "ROLODEX", "SCHEDULE", "SERVICE", "SPHRASE", "STOCKLOG", "SUBCAT", "SUPMERGE", "SUPPORT", "SXPHRASE", "SYSTEM", "TASKS", "TASKSTAT", "TAXTABLE", "TBEVENTS", "TBEXCLUD", "TBGROUP", "TBLIST", "TBLOG", "TBSYSTEM", "TBTMPL", "TBTMPLHD", "TECHS", "TEMPAPD", "TICKET", "TIMECARD", "TIMECAT", "TODO", "TRANSLOG", "TROUBLE", "TSAPTMNT", "TSCOUNT", "TSMDATA", "TSRECUR", "USER17", "USER18", "USER19", "USER20", "USERLOG", "VENDNAME", "VENDOR", "ZONEDEF1", "ZONEDEF2", "ZONEMAST", "ZONES", "ZONETYPE"],
  targets: [],
  tabs: ["CUSTOMER", "INVOICE"],
  selectedTab: '',
  lessThan: {},
  greaterThan: {},
  equal: {},
  not: {}, //not and like will need to be key:[not, not]
  like: {},
  link: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    case UPDATE_TABLE_TABS:
      const oldTab = action.payload[0];
      const newTab = action.payload[1];
      let workingState = {...state};
      const oldTabIndex = workingState.tabs.indexOf(oldTab);
      if (oldTabIndex === -1) {
        workingState.tabs.push(newTab);
      } else {
        workingState.tabs.splice(workingState.tabs.indexOf(oldTab), 1, newTab);
      }
      workingState.selectedTab = newTab;
      return workingState;

    case CLOSE_TABLE_TAB:
      workingState = {...state};
      const closeTabIndex = workingState.tabs.indexOf(action.payload);
      if (closeTabIndex === -1) {
        return state;
      } else {
        //Remove everything selected by the closed table
        const reg = new RegExp(`^(${action.payload}\\.)`, 'i');
        workingState.tabs.splice(closeTabIndex, 1);
        workingState.targets = workingState.targets.filter((target) => {
          return !target.match(reg);
        });
        delete workingState.lessThan[action.payload];
        delete workingState.greaterThan[action.payload];
        delete workingState.equal[action.payload];
        delete workingState.not[action.payload];
        delete workingState.like[action.payload];
        if (workingState.selectedTab === action.payload) {
          workingState.selectedTab = '';
        }
        return workingState;
      }

    case ADD_TABLE_TAB:
      workingState = {...state};
      workingState.tabs.push(action.payload);
      workingState.selectedTab = action.payload;
      return workingState;

    case UPDATE_SELECTED_TABLE_TAB:
      workingState = {...state};
      workingState.selectedTab = action.payload;
      return workingState;

    case TOGGLE_SELECTED_RECORD:
      workingState = {...state};
      const selectedRecordToToggle = action.payload;
      const targetsIndex = workingState.targets.indexOf(selectedRecordToToggle);
      if (targetsIndex === -1) {
        workingState.targets.push(selectedRecordToToggle);
      } else {
        workingState.targets.splice(targetsIndex, 1);
      }
      return workingState;

    case REMOVE_TARGET:
      workingState = {...state};
      workingState.targets = workingState.targets.filter((target) => {
        return target !== action.payload;
      });
      return workingState;

    case SELECT_ALL_RECORDS:
      workingState = {...state};
      action.payload.forEach((record) => {
        if (workingState.targets.indexOf(record) === -1) {
          workingState.targets.push(record);
        }
      });
      return workingState;

    case DESELECT_ALL_RECORDS:
      workingState = {...state};
      const reg = new RegExp(`^(${action.payload}\\.)`, 'i');
      workingState.targets = workingState.targets.filter((target) => {
        return !target.match(reg);
      });
      return workingState;

    case ADD_EQUAL_LESS_GREATER:
      workingState = {...state};
      let filterType = action.payload[0];
      let tableRecord = action.payload[1];
      let filterValue = action.payload[2];
      if (filterType === 'greater' || filterType === 'less') {
        filterType = `${filterType}Than`;
      }
      workingState[filterType][tableRecord] = filterValue;
      return workingState;

    case REMOVE_EQUAL_LESS_GREATER:
      workingState = {...state}
      filterType = action.payload[0];
      tableRecord = action.payload[1];
      delete workingState[filterType][tableRecord];
      return workingState;

    case ADD_FILTER_NOT_LIKE:
      workingState = {...state}
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
      workingState = {...state}
      filterType = action.payload[0];
      tableRecord = action.payload[1];
      filterValue = action.payload[2];
      workingState[filterType][tableRecord] =
      workingState[filterType][tableRecord].filter((value) => {
        return value !== filterValue
      });
      return workingState;

    case ADD_FILTER_LINK:
      workingState = {...state};
      workingState.link.push(`${action.payload[0]} = ${action.payload[1]}`);
      return workingState;

    case REMOVE_FILTER_LINK:
      workingState = {...state};
      workingState.link = [];
      return workingState;

    default:
      return state;
  }
}
