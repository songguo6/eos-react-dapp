import React, { Component } from 'react';
import { Layout, Button, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect }from 'react-redux';

import * as bcUtils from '../../bc/bcUtils';

class Header extends Component {

  componentDidMount(){
    this.props.checkLogin();
  }

  render(){
    const {account, login} = this.props;
    return (
      <Layout.Header>
        <div className='logo'>
          <img src='/pics/nav-logo.png' alt=''/>
          <span>分享吧</span>
        </div>  
        <Link to='/' className='nav-menu'>首页</Link>
        {
          account ? this.getDropDown(account) :
            <Button type='primary' className='nav-btn' onClick={login}>登录</Button>
        }
      </Layout.Header>
    );
  }

  getDropDown(text){
    const menu = (
      <Menu>
        <Menu.Item onClick={this.props.logout}>登出</Menu.Item>
        <Menu.Item><Link to='/create'>创作</Link></Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} className='nav-menu fr'>
        <a className='ant-dropdown-link' href='#a'>{text}<Icon type='down' />
        </a>
      </Dropdown>
    );
  }
}

const mapState = (state) => ({
  account: state.account,
});

const mapDispatch = (dispatch) => ({
  checkLogin(){
    dispatch(bcUtils.checkLogin());
  },
  login(){
    dispatch(bcUtils.login());
  },
  logout(scatter){
    dispatch(bcUtils.logout());
  }
});

export default connect(mapState, mapDispatch)(Header);
