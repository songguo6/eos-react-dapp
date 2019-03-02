import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import IpfsAPI from 'ipfs-api';

import { notification } from 'antd';
import * as actionCreator from '../store/actionCreator';

const APP_NAME = '分享吧';

const ipfs = IpfsAPI('localhost', '5002', {protocol: 'http'});
const ipfsPrefix = "http://localhost:5002/ipfs/";

const notify = () => {
  notification.error({
    message: '没有检测到Scatter',
    description: '请安装Scatter或激活',
  });
};

const networkConfig = {
  blockchain:'eos',
  protocol:'https',
  host:'nodes.get-scatter.com',
  port:443,
  chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
};

ScatterJS.plugins(new ScatterEOS());   
  
export const login = () => (
  async (dispatch) => {
    const connected = await ScatterJS.scatter.connect(APP_NAME);
    if(!connected) { notify(); return false;}
  
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

export const saveTextToIPFS = (text) => {
  return new Promise((resolve, reject) => {
    const descBuf = Buffer.from(text, 'utf-8');
    ipfs.add(descBuf).then(res => {
      resolve({hash: res[0].hash});
    }).catch(error => {
      console.log(error);
    });
  });
};

export const saveFileToIPFS = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      ipfs.add(buffer).then(res => {
        resolve(res[0].hash);
      }).catch(error => {
        console.log(error);
      });
    };
  });
};

export const ipfsUrl = (url) => {
  return ipfsPrefix + url;
}
