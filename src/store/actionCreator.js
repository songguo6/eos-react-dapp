import * as actionTypes from './actionTypes';

export const changeLoginStatus = (accountName) => ({
  type: actionTypes.ACTION_CHANGE_LOGIN_STATUS,
  value: accountName
});

