import React from 'react';
import { shallow, ReactWrapper } from 'enzyme';
import { Route } from 'react-router-dom';
import { PrivateDashboard } from '../dashboard';
import { HomeContainer } from '../../modules/home/containers/home.container';
import { ApiKeysContainer } from '../../modules/api-keys/containers/api-keys/api-keys.container';
import { ConntectorHubContainer } from '../../modules/connector-hub/containers/connector-hub.container';
import { ConnectionsContainer } from '../../modules/connections/containers/connections.container';

describe('Dashboard', () => {
  beforeEach(() => {
    this.component = shallow(<PrivateDashboard isAuth={() => true} />);
  });

  const routeComponent = (path: string) => {
    return this.component
      .find(Route)
      .findWhere((comp: ReactWrapper) => comp.prop('path') === path)
      .first()
      .prop('component');
  };

  it('routes / to HomeContainer', () => {
    expect(routeComponent('/')).toBe(HomeContainer);
  });

  it('routes /api-keys to ApiKeysContainer', () => {
    expect(routeComponent('/api-keys')).toBe(ApiKeysContainer);
  });

  it('routes /connector-hub to ConntectorHubContainer', () => {
    expect(routeComponent('/connector-hub')).toBe(ConntectorHubContainer);
  });

  it('routes /connector-hub/:connectorId/connections to ConnectionsContainer', () => {
    expect(routeComponent('/connector-hub/:connectorId/connections')).toBe(ConnectionsContainer);
  });
});
