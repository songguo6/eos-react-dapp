import * as actionTypes from './actionTypes';

const defaultState = {
  layoutBackground: 'white',
  account: '',
}

//不要修改state
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type){
    case actionTypes.ACTION_CHANGE_LOGIN_STATUS:  
      newState.account = action.value;
      break;
    case actionTypes.ACTION_CHANGE_BACKGROUND:
      newState.layoutBackground = action.value;
      break;
    default:
      break;     
  }
  return newState;
}