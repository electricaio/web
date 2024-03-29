import React, { SFC } from 'react';
import { shallow, ReactWrapper } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import { PrivateDashboard, PrivateRoute } from '../dashboard';
import { AccessKeysContainer } from '../../modules/access-keys/containers/access-keys/access-keys.container';
import { APIHubContainer } from '../../modules/api-hub/containers/api-hub.container';
import { ConnectionsContainer } from '../../modules/connections/containers/connections.container';
import { HomeContainer } from '../../modules/home/containers/home.container';

describe('Dashboard', () => {
  beforeEach(() => {
    this.component = shallow(<PrivateDashboard isAuthenticated />);
  });

  const routeComponent = (path: string) => {
    return this.component
      .find(PrivateRoute)
      .findWhere((comp: ReactWrapper) => comp.prop('path') === path)
      .first()
      .prop('component');
  };

  it('routes / to HomeContainer', () => {
    expect(routeComponent('/')).toBe(HomeContainer);
  });

  it('home route contains exact property', () => {
    const homeRoute = this.component
      .find(PrivateRoute)
      .findWhere((comp: ReactWrapper) => comp.prop('path') === '/')
      .first();
    expect(homeRoute.prop('exact')).toBeTruthy();
  });

  it('routes /access-keys to AccessKeysContainer', () => {
    expect(routeComponent('/access-keys')).toBe(AccessKeysContainer);
  });

  it('routes /api-hub to APIHubContainer', () => {
    expect(routeComponent('/api-hub')).toBe(APIHubContainer);
  });

  it('routes /api-hub/:connectorId to ConnectionsContainer', () => {
    expect(routeComponent('/api-hub/:connectorId')).toBe(ConnectionsContainer);
  });

  describe('PrivateRoute', () => {
    const TestComponent: SFC = () => <div>content</div>;

    it('redirects to login if auth failed', () => {
      const component = shallow(<PrivateRoute component={TestComponent} isAuthenticated={false} />);
      expect(component.find(Route).prop('render')()).toEqual(<Redirect to="/login" />);
    });

    it('render component if auth passed', () => {
      const component = shallow(<PrivateRoute component={TestComponent} isAuthenticated />);
      expect(component.find(Route).prop('render')()).toEqual(<TestComponent />);
    });
  });
});
