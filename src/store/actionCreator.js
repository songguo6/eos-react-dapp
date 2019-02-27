import * as actionTypes from './actionTypes';

export const setScatter = (scatter) => ({
  type: actionTypes.ACTION_SET_SCATTER,
  value: scatter
});

export const changeLoginStatus = (accountName) => ({
  type: actionTypes.ACTION_CHANGE_LOGIN_STATUS,
  value: accountName
});

