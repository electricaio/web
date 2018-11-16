import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../redux/auth/actions';
import { MainLayoutContainer } from '../components/layouts/main-layout/main-layout';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { ConntectorHubContainer } from '../modules/connector-hub/containers/connector-hub.container';

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

export const PrivateDashboard: React.SFC<PropsFromDispatch> = ({ isAuth }) => {
  return (
    <MainLayoutContainer>
      <Switch>
        <PrivateRoute isAuth={isAuth} path="/api-keys" component={ApiKeysContainer} />
        <PrivateRoute isAuth={isAuth} path="/connector-hub" component={ConntectorHubContainer} />
      </Switch>
    </MainLayoutContainer>
  );
};

export const Dashboard = connect(
  null,
  mapDispatchToProps
)(PrivateDashboard);
