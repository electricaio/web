import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './theme.less';
import './overrides.scss';

import { store } from './modules';
import apiKeys from './pages/api-keys';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={apiKeys} />
        <Route path="/api-keys" />
        <Route path="/stl" />
        <Route path="/monitor" />
        <Route path="/notifications" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
