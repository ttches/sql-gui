import { cloneDeep } from 'lodash'

import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/index';

const INITIAL_STATE = {"recharge for open accounts":{"tables":["ACCTCAT","ACCTNUMS","APPDET","APPOINT","APPOINTS","ASSEMBLY","BILLADDR","CALLHIST","CARD","CATEGORY","CENTRAL","CODES","CONTACTS","CONTCAT","CONTLOC","CONTMAST","CONTRACT","CONTRCTS","CONTYPE","CONVERSE","CORRLOG","COSTCODE","CREDACT","CREDHEAD","CUSTATUS","CUSTOMER","DBA","DEALER","DEALINV","DEFAULTS","DETMEMO","DISPATCH","EDEALINV","EDEFAULT","EHTM","EHTMTIC","EMAILINV","EQUIPMNT","ETECH","ETICKET","FORMS","GLTABLE","HELPDESK","IMAGES","INCOME","INVDET","INVMEMO","INVOICE","INVREC","LABELS","LETTER","LOCATION","LOCINV","LOGTYPE","MASSYS","MASTSYS","MERGELST","MULTICOM","PARTCAT","PARTDESC","PARTS","PARTSBUY","PARTSLVL","PARTYPE","PCONTRCT","PHONELBL","PHRASE","PLEVELS","PODETAIL","POHEAD","POMEMO","POPAPPT","POPBAL","POPCRED","POPREM","POSITIO","POTITLE","QUICKCAT","QUICKSYS","QUICKTMP","RAPIDSYS","RATES","RECDET","RECEIPTS","RECHARGE","RELATION","REMARKS","REMINDER","REPAIR","ROLODEX","SCHEDULE","SERVICE","SPHRASE","STOCKLOG","SUBCAT","SUPMERGE","SUPPORT","SXPHRASE","SYSTEM","TASKS","TASKSTAT","TAXTABLE","TBEVENTS","TBEXCLUD","TBGROUP","TBLIST","TBLOG","TBSYSTEM","TBTMPL","TBTMPLHD","TECHS","TEMPAPD","TICKET","TIMECARD","TIMECAT","TODO","TRANSLOG","TROUBLE","TSAPTMNT","TSCOUNT","TSMDATA","TSRECUR","USER17","USER18","USER19","USER20","USERLOG","VENDNAME","VENDOR","ZONEDEF1","ZONEDEF2","ZONEMAST","ZONES","ZONETYPE"],"targets":["CUSTOMER.ACCOUNT","CUSTOMER.LASTNAME","CUSTOMER.FIRSTNAME","RECHARGE.SERVICETYPE","RECHARGE.BILLPERIOD","RECHARGE.NEXTDATE","RECHARGE.CHARGE","RECHARGE.MONTHLY"],"tabs":["CUSTOMER","RECHARGE"],"selectedTab":"RECHARGE","lessThan":{},"greaterThan":{},"equal":{},"in":["RECHARGE.ACCOUNT","saved.not closed","<div><div>\n        <div><span>\n        <span class=\"keyword\">SELECT </span>\n        CUSTOMER.ACCOUNT\n      </span></div>\n        <div><span>\n        <span class=\"keyword\">FROM </span>\n        CUSTOMER\n      </span></div>\n        <div><span>\n          <span class=\"keyword\">WHERE </span>\n          CUSTOMER.CLOSED = ''\n        </span></div>\n      </div></div>"],"not":{},"like":{},"link":[],"script":"<div><div>\n        <div><span>\n        <span class=\"keyword\">SELECT </span>\n        CUSTOMER.ACCOUNT, CUSTOMER.LASTNAME, CUSTOMER.FIRSTNAME, RECHARGE.SERVICETYPE, RECHARGE.BILLPERIOD, RECHARGE.NEXTDATE, RECHARGE.CHARGE, RECHARGE.MONTHLY\n      </span></div>\n        <div><span>\n        <span class=\"keyword\">FROM </span>\n        CUSTOMER, RECHARGE\n      </span></div>\n        <div><span>\n          <span class=\"keyword\">WHERE </span>\n          RECHARGE.ACCOUNT <span class=\"keyword\">IN</span> ( <div><div>\n        <div><span>\n        <span class=\"keyword\">SELECT </span>\n        CUSTOMER.ACCOUNT\n      </span></div>\n        <div><span>\n        <span class=\"keyword\">FROM </span>\n        CUSTOMER\n      </span></div>\n        <div><span>\n          <span class=\"keyword\">WHERE </span>\n          CUSTOMER.CLOSED = ''\n        </span></div>\n      </div></div>)\n        </span></div>\n      </div></div>"}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_FAVORITE:
      let workingState = cloneDeep(state)
      let favorite = action.payload[0];
      let data = cloneDeep(action.payload[1]);
      workingState[favorite] = data;
      return workingState

    case REMOVE_FAVORITE:
      workingState = {...state}
      favorite = action.payload;
      delete workingState[favorite];
      return workingState;

    default:
      return state;
  }
}
