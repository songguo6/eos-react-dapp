import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Header from './pages/header';
import Home from './pages/home';
import Create from './pages/create';

const { Content, Footer } = Layout;

class LayoutWrapper extends Component {
  render(){
    return (
      <BrowserRouter>
        <Layout style={{ background: this.props.background }}>
          <Header />
          <Content className='content'>
            <Route path='/' exact component={Home}></Route>
            <Route path='/create' exact component={Create}></Route>
          </Content>
          <Footer style={{ textAlign: 'center', background: this.props.background }}>
            分享吧 ©2019 Created by Songguo
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapState = (state) => ({
  background: state.layoutBackground,
});

export default connect(mapState, null)(LayoutWrapper);