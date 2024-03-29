import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, RouteProps } from 'react-router-dom';
import { LoginPage } from '../pages/login';
import { SignupPage } from '../pages/signup';
import { Dashboard } from './dashboard';

export interface TAppRouter {
  component: React.ComponentType<RouteProps>;
}

export class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
