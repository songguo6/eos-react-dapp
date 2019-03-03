import React, { Component } from 'react';
import { Provider } from 'react-redux';

import LayoutWrapper from './LayoutWrapper';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LayoutWrapper />
      </Provider> 
    );
  }
}

export default App;
