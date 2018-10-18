import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './redux/store';
import { ApiKeysLayout } from './pages/api-keys';
import login from './pages/login';
import signup from './pages/signup';
import {StlHubLayout} from './pages/stl-hub';

import './theme.less';
import './overrides.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={ApiKeysLayout} />
            <Route path="/api-keys"/>
            <Route path="/stl-hub" component={StlHubLayout}/>
            <Route path="/monitor" />
            <Route path="/notifications" />
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
