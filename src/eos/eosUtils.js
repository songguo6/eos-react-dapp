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
  async (dispatch) => {
    const connected = await ScatterJS.scatter.connect(APP_NAME);
    if(!connected) return false;

    const scatter = ScatterJS.scatter;      
    try {
      await scatter.login({accounts:[networkConfig]})
      const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
      dispatch(actionCreator.changeLoginStatus(account.name));   
    } catch (error) {
      console.error(error);
    }
  }
);

export const logout = () => (
  async (dispatch) => {
    await ScatterJS.scatter.logout();
    dispatch(actionCreator.changeLoginStatus(false));
  }
);

export const checkLogin = () => (
  async (dispatch) => {
    const connected = await ScatterJS.scatter.connect(APP_NAME);
    if(!connected) return false;

    const res = await ScatterJS.scatter.checkLogin();
    if(res) dispatch(login());
  }
);