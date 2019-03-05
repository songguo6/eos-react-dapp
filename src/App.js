import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BackTop } from 'antd';

import LayoutWrapper from './LayoutWrapper';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LayoutWrapper />
        <BackTop />
      </Provider> 
    );
  }
}

export default App;
