import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../redux/auth/actions';
import { MainLayoutContainer } from '../components/layouts/main-layout/main-layout';
import { HomeContainer } from '../modules/home/containers/home.container';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { ConntectorHubContainer } from '../modules/connector-hub/containers/connector-hub.container';
import { ConnectionsContainer } from '../modules/connections/containers/connections.container';

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

export const PrivateRoute: React.SFC<TAppRouter> = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return isAuth() ? <Component {...props} /> : <Redirect to="/login" push />;
    }}
  />
);

export const PrivateDashboard: React.SFC<PropsFromDispatch> = ({ isAuth }) => {
  return (
    <MainLayoutContainer>
      <Switch>
        <PrivateRoute exact isAuth={isAuth} path="/" component={HomeContainer} />
        <PrivateRoute isAuth={isAuth} path="/api-keys" component={ApiKeysContainer} />
        <PrivateRoute
          exact
          isAuth={isAuth}
          path="/connector-hub"
          component={ConntectorHubContainer}
        />
        <PrivateRoute
          isAuth={isAuth}
          path="/connector-hub/:connectorId/connections"
          component={ConnectionsContainer}
        />
      </Switch>
    </MainLayoutContainer>
  );
};

export const Dashboard = connect(
  null,
  mapDispatchToProps
)(PrivateDashboard);
