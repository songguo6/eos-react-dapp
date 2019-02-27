import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './pages/header';
import Home from './pages/home';
import store from './store';

import './App.css';

const { Content, Footer } = Layout;

const Login = () => (<h1>登录</h1>);
const Create = () => (<h1>创作</h1>);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Header />
            <Content className='content'>
              <Route path='/' exact component={Home}></Route>
              <Route path='/login' exact component={Login}></Route>
              <Route path='/create' exact component={Create}></Route>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              分享吧 ©2019 Created by Songguo
            </Footer>
          </Layout>
        </BrowserRouter> 
      </Provider> 
    );
  }
}

export default App;
