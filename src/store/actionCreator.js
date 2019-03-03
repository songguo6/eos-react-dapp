import * as actionTypes from './actionTypes';

export const changeLayoutBackground = (color) => ({
  type: actionTypes.ACTION_CHANGE_BACKGROUND,
  value: color
});

export const changeLoginStatus = (account) => ({
  type: actionTypes.ACTION_CHANGE_LOGIN_STATUS,
  value: account
});



