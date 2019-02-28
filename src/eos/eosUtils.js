import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

import * as actionCreator from '../store/actionCreator';

ScatterJS.plugins(new ScatterEOS());   

const APP_NAME = '分享吧';

const networkConfig = {
  blockchain:'eos',
  protocol:'https',
  host:'nodes.get-scatter.com',
  port:443,
  chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
};
  
export const login = () => (
  (dispatch) => {
    ScatterJS.scatter.connect(APP_NAME).then(connected => {
      if(!connected) return false;

      const scatter = ScatterJS.scatter;      
      scatter.getIdentity({ accounts:[networkConfig] }).then(() => {
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        dispatch(actionCreator.changeLoginStatus(account.name));   
      }).catch(error => {
          console.error(error);
      });
    });    
  }
);

export const logout = () => (
  (dispatch) => {
    ScatterJS.scatter.logout();
    dispatch(actionCreator.changeLoginStatus(false));
  }
);

export const checkLogin = () => (
  (dispatch) => {
    ScatterJS.scatter.connect(APP_NAME).then(connected => {
      if(!connected) return false;
      ScatterJS.scatter.checkLogin().then(res => {
        if(res) dispatch(login());
      });
    });  
  }
);