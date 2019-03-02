import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './pages/header';
import Home from './pages/home';
import Create from './pages/create';
import store from './store';

import './App.css';

const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Header />
            <Content className='content'>
              <Route path='/' exact component={Home}></Route>
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
