import React, { SFC } from 'react';
import { shallow, ReactWrapper } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import { PrivateDashboard, PrivateRoute } from '../dashboard';
import { ApiKeysContainer } from '../../modules/api-keys/containers/api-keys/api-keys.container';
import { ConntectorHubContainer } from '../../modules/connector-hub/containers/connector-hub.container';
import { ConnectionsContainer } from '../../modules/connections/containers/connections.container';

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

  it('routes /api-keys to ApiKeysContainer', () => {
    expect(routeComponent('/api-keys')).toBe(ApiKeysContainer);
  });

  it('routes /connector-hub to ConntectorHubContainer', () => {
    expect(routeComponent('/connector-hub')).toBe(ConntectorHubContainer);
  });

  it('routes /connector-hub/:connectorId/connections to ConnectionsContainer', () => {
    expect(routeComponent('/connector-hub/:connectorId/connections')).toBe(ConnectionsContainer);
  });

  describe('PrivateRoute', () => {
    const TestComponent: SFC = () => <div>content</div>;

    it('redirects to login if auth failed', () => {
      const component = shallow(<PrivateRoute component={TestComponent} isAuthenticated={false} />);
      expect(component.find(Route).prop('render')()).toEqual(<Redirect to="/login" />);
    });

    it('render component if aith passed', () => {
      const component = shallow(<PrivateRoute component={TestComponent} isAuthenticated />);
      expect(component.find(Route).prop('render')()).toEqual(<TestComponent />);
    });
  });
});
