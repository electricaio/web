import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import configureStore from './redux/configureStore';
import { Routes } from './routes';
import { ConnectedRouter } from 'connected-react-router';

import './theme.less';

const history = createHashHistory();
const store = configureStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
