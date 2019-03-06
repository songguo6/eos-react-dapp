## 基于React/EOS/IPFS的内容分享DAPP

### 运行环境

- Linux / Mac OS
- [nodejs](https://nodejs.org)
- [IPFS](https://github.com/ipfs/js-ipfs)
- [EOS](https://github.com/EOSIO/eos/releases/tag/v1.6.2)
- [EOSIO.cdt](https://github.com/EOSIO/eosio.cdt/releases/tag/v1.5.0)
- [Scatter](https://get-scatter.com/)  

### 安装启动React项目

$ git clone https://github.com/songguo6/eos-react-dapp.git  
$ cd eos-react-dapp  
$ npm install  
$ npm start  

### 部署EOS智能合约

$ cleos create account eosio fenxiangbaio <public_key>

$ cd eos-react-dapp/src/bc/contracts/fenxiangbaio  
$ eosio-cpp -o fenxiangbaio.wasm fenxiangbaio.cpp --abigen

$ cd ..  
$ cleos set contract fenxiangbaio fenxiangbaio -p fenxiangbaio@active

### 启动IPFS本地节点

$ jsipfs daemon


  

