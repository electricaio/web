import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import configureStore from './redux/configureStore';
import { Routes } from './routes';

import './theme.less';

const history = createHashHistory();
const store = configureStore(history);

class App extends Component {
  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
