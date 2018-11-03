import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { isAuthenticated } from './redux/auth/actions';
import { ApiKeysLayout } from './pages/api-keys';
import { ConnectorHubLayout } from './pages/connector-hub';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';

interface PropsFromDispatch {
  isAuth: typeof isAuthenticated;
}

const mapDispatchToProps = () => ({
  isAuth: isAuthenticated,
});

type AllProps = PropsFromDispatch & RouteProps;

export interface TAppRouter extends AllProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.SFC<TAppRouter> = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuth() ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);
class App extends Component<PropsFromDispatch> {
  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute isAuth={this.props.isAuth} path="/api-keys" component={ApiKeysLayout} />
          <PrivateRoute
            isAuth={this.props.isAuth}
            path="/connector-hub"
            component={ConnectorHubLayout}
          />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </Router>
    );
  }
}

export const Routes = connect(
  null,
  mapDispatchToProps
)(App);
