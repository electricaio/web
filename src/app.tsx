import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './modules/home/components/home/home';
import configureStore from './redux/configureStore';
import { ApiKeysLayout } from './pages/api-keys';
import { ConnectorHubLayout } from './pages/connector-hub';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';

import './theme.less';
import './overrides.scss';

const history = createHashHistory();

const store = configureStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/api-keys" component={ApiKeysLayout} />
            <Route path="/connector-hub" component={ConnectorHubLayout} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route component={() => <div>No Match</div>} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
