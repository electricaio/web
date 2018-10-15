import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './redux/store';
import { ApiKeysLayout } from './pages/api-keys';
import './theme.less';
import './overrides.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={ApiKeysLayout} />
            <Route path="/api-keys" />
            <Route path="/stl" />
            <Route path="/monitor" />
            <Route path="/notifications" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
