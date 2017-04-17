import { UPDATE_TABLE_TABS, CLOSE_TABLE_TAB,
  ADD_TABLE_TAB, UPDATE_SELECTED_TABLE_TAB,
  TOGGLE_SELECTED_RECORD } from '../actions/index';

const INITIAL_STATE = {
  tables: ["ACCTCAT", "ACCTNUMS", "APPDET", "APPOINT", "APPOINTS", "ASSEMBLY", "BILLADDR", "CALLHIST", "CARD", "CATEGORY", "CENTRAL", "CODES", "CONTACTS", "CONTCAT", "CONTLOC", "CONTMAST", "CONTRACT", "CONTRCTS", "CONTYPE", "CONVERSE", "CORRLOG", "COSTCODE", "CREDACT", "CREDHEAD", "CUSTATUS", "CUSTOMER", "DBA", "DEALER", "DEALINV", "DEFAULTS", "DETMEMO", "DISPATCH", "EDEALINV", "EDEFAULT", "EHTM", "EHTMTIC", "EMAILINV", "EQUIPMNT", "ETECH", "ETICKET", "FORMS", "GLTABLE", "HELPDESK", "IMAGES", "INCOME", "INVDET", "INVMEMO", "INVOICE", "INVREC", "LABELS", "LETTER", "LOCATION", "LOCINV", "LOGTYPE", "MASSYS", "MASTSYS", "MERGELST", "MULTICOM", "PARTCAT", "PARTDESC", "PARTS", "PARTSBUY", "PARTSLVL", "PARTYPE", "PCONTRCT", "PHONELBL", "PHRASE", "PLEVELS", "PODETAIL", "POHEAD", "POMEMO", "POPAPPT", "POPBAL", "POPCRED", "POPREM", "POSITIO", "POTITLE", "QUICKCAT", "QUICKSYS", "QUICKTMP", "RAPIDSYS", "RATES", "RECDET", "RECEIPTS", "RECHARGE", "RELATION", "REMARKS", "REMINDER", "REPAIR", "ROLODEX", "SCHEDULE", "SERVICE", "SPHRASE", "STOCKLOG", "SUBCAT", "SUPMERGE", "SUPPORT", "SXPHRASE", "SYSTEM", "TASKS", "TASKSTAT", "TAXTABLE", "TBEVENTS", "TBEXCLUD", "TBGROUP", "TBLIST", "TBLOG", "TBSYSTEM", "TBTMPL", "TBTMPLHD", "TECHS", "TEMPAPD", "TICKET", "TIMECARD", "TIMECAT", "TODO", "TRANSLOG", "TROUBLE", "TSAPTMNT", "TSCOUNT", "TSMDATA", "TSRECUR", "USER17", "USER18", "USER19", "USER20", "USERLOG", "VENDNAME", "VENDOR", "ZONEDEF1", "ZONEDEF2", "ZONEMAST", "ZONES", "ZONETYPE"],
  targets: [],
  tabs: ["ACCTCAT", "DBA", "APPDET"],
  selectedTab: '',
  lessThan: {},
  greaterThan: {},
  not: [],
  like: [],
  equal: {}
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
        workingState.tabs.splice(closeTabIndex, 1);
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

    default:
      return state;
  }
}
