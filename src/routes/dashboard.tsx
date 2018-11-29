import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { MainLayoutContainer } from '../components/layouts/main-layout/main-layout';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { ConntectorHubContainer } from '../modules/connector-hub/containers/connector-hub.container';
import { ConnectionsContainer } from '../modules/connections/containers/connections.container';
import { ApplicationState } from '../redux/store';
import { HomeContainer } from '../modules/home/containers/home.container';

interface PropsFromDispatch {
  isAuthenticated: boolean;
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  isAuthenticated: auth.tokens.access_token !== null,
});

type AllProps = PropsFromDispatch & RouteProps;

export interface TAppRouter extends AllProps {
  component: React.ComponentType<RouteProps>;
}

export const PrivateRoute: React.SFC<TAppRouter> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

export const PrivateDashboard: React.SFC<PropsFromDispatch> = ({ isAuthenticated }) => {
  return (
    <MainLayoutContainer>
      <Switch>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/"
          exact
          component={HomeContainer}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/api-keys"
          component={ApiKeysContainer}
        />
        <PrivateRoute
          exact
          isAuthenticated={isAuthenticated}
          path="/connector-hub"
          component={ConntectorHubContainer}
        />
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/connector-hub/:connectorId/connections"
          component={ConnectionsContainer}
        />
      </Switch>
    </MainLayoutContainer>
  );
};

export const Dashboard = connect(mapStateToProps)(PrivateDashboard);