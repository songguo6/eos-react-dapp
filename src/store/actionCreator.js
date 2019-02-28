import * as actionTypes from './actionTypes';

export const changeLoginStatus = (account) => ({
  type: actionTypes.ACTION_CHANGE_LOGIN_STATUS,
  value: account
});

