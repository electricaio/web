import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './modules/home/components/home/home';
import { Monitor } from './modules/monitor/components/monitor/monitor';
import { Notifications } from './modules/notifications/components/notifications/notifications';
import { StlHub } from './modules/stl-hub/components/stl-hub/stl-hub';
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
            <Route path="/" exact={true} component={Home} />
            <Route path="/api-keys" component={ApiKeysLayout} />
            <Route path="/stl-hub" component={StlHub} />
            <Route path="/monitor" component={Monitor} />
            <Route path="/notifications" component={Notifications} />
            <Route component={() => <div>No Match</div>} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
