import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import IpfsAPI from 'ipfs-api';

import { notification } from 'antd';
import * as actionCreator from '../store/actionCreator';

const APP_NAME = '分享吧';
const CONTRACT_NAME = 'fenxiangbaio';

const ipfs = IpfsAPI('localhost', '5002', {protocol: 'http'});
const ipfsPrefix = "http://localhost:5002/ipfs/";

const notify = () => {
  notification.error({
    message: '没有检测到Scatter',
    description: '请安装Scatter或激活',
  });
};

// const networkConfig = {
//   blockchain:'eos',
//   protocol:'https',
//   host:'nodes.get-scatter.com',
//   port:443,
//   chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
// };

const networkConfig = {
  blockchain:'eos',
  protocol:'http',
  host:'127.0.0.1',
  port:8888,
  chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
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
      resolve(res[0].hash);
    }).catch(error => {
      console.log(error);
    });
  });
};

export const readTextFromIPFS = (hash) => {
  return new Promise((resolve, reject) => {
    ipfs.cat(hash).then(res => {
      let content = new TextDecoder('utf-8').decode(res);
      resolve(content);
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
};

export const eosTransact = (action, data, callback) => {
  const scatter = ScatterJS.scatter;
  const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
  const eos = scatter.eos(networkConfig, Eos, { expireInSeconds:60 });
  eos.transaction({
    actions: [
      {
        account: CONTRACT_NAME,
        name: action,
        authorization: [
          {
            actor: `${account.name}`,
            permission: `${account.authority}`
          }
        ],
        data: data
      }
    ]
  });
  callback();
};

export const eosTableRows = (tableName, offset, callback, param = {}) => {
  const scatter = ScatterJS.scatter;
  const eos = scatter.eos(networkConfig, Eos, { expireInSeconds:60 });
  eos.getTableRows(true, CONTRACT_NAME, CONTRACT_NAME, tableName, 'id', 0, -1, 1000, 'i64', 1).then(res => {
    callback(provide(res.rows, offset, param));
  });
}

export const eosTableRowById = (tableName, id, callback) => {
  const scatter = ScatterJS.scatter;
  const eos = scatter.eos(networkConfig, Eos, { expireInSeconds:60 });
  eos.getTableRows(true, CONTRACT_NAME, CONTRACT_NAME, tableName, 'id', id, -1, 1, 'i64', 1).then(res => {
    callback(res.rows[0]);
  });
};

/**
 * EOS目前对数据库的查询操作支持很弱，cleos在1.5.0版本才添加了倒序查询，eosjs还不支持，这里手动处理数据
 */
const provide = (data, offset, param) => {
  
  let newData = [];
  let paramKey = null;
  Object.keys(param).forEach(key => {
    paramKey = key;
  });

  if(paramKey){
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if(paramKey === key && param[paramKey] === item[key]){
          newData.push(item);
        }
      });
    });
  }else{
    newData = [...data];
  }

  newData = newData.sort(compare('id'));
  return newData.splice(offset, 10);
};

const compare = (property) => ((a,b) => {
  var value1 = a[property];
  var value2 = b[property];
  return value2 - value1;
});