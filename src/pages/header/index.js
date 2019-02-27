import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render(){
    return (
      <Layout.Header>
        <div className='logo'>
          <img src='/pics/nav-logo.png' />
          <span>分享吧</span>
        </div>  
        <Link to='/'>首页</Link>
        <Button type='primary' style={{float: 'right'}} className='nav-btn'>
          <Link to='/create'>创作</Link>
        </Button>
        <Button type='primary' style={{float: 'right'}} className='nav-btn'>
          <Link to='/login'>登录</Link>
        </Button>
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
