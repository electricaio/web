import { shallow } from 'enzyme';
import React from 'react';
import { Home } from '../home.container';
import { Header } from '../../../ui-kit/header';
import { DashboardCard } from '../../components/home/dashboard-card';
import { AsyncComponent } from '../../../../components/async-component/async-component';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { UserDto } from '../../../../redux/auth/types';

describe('Home Container', () => {
  const fetchConnectorsMock = jest.fn();
  const fetchApiKeysMock = jest.fn();
  const connectors: ConnectorModal[] = [];
  const apiKeys: ApiKeyModal[] = [];
  const user: UserDto = {
    firstName: 'Chris',
    lastName: 'McCaw',
    email: 'chris@mccaw.com',
    organizationId: 12,
    id: 12,
  };
  beforeEach(() => {
    this.container = shallow(
      <Home
        user={user}
        fetchConnectors={fetchConnectorsMock}
        fetchKeys={fetchApiKeysMock}
        connectors={connectors}
        apiKeys={apiKeys}
      />
    );
  });

  it('renders a Header', () => {
    expect(this.container.find(Header)).toHaveLength(1);
  });

  describe('async component', () => {
    it('renders the component', () => {
      expect(this.container.find(AsyncComponent)).toHaveLength(1);
    });

    it('passes fetchConnectors and fetchKeys actions', () => {
      const actions = this.container.find(AsyncComponent).prop('getAsyncActions');
      actions();
      expect(fetchApiKeysMock).toBeCalled();
      expect(fetchConnectorsMock).toBeCalled();
    });
  });

  describe('API Keys Card', () => {
    it('renders', () => {
      expect(this.container.find(DashboardCard).at(0)).toHaveLength(1);
    });

    it('passes properties', () => {
      const apiKeysCard = this.container.find(DashboardCard).at(0);
      expect(apiKeysCard.props()).toEqual(
        expect.objectContaining({
          iconType: 'api',
          linkTo: 'api-keys',
          stat: apiKeys.length,
        })
      );
    });
  });
  describe('Connectors Card', () => {
    it('renders', () => {
      expect(this.container.find(DashboardCard).at(1)).toHaveLength(1);
    });

    it('passes properties', () => {
      const connectorsCard = this.container.find(DashboardCard).at(1);
      expect(connectorsCard.props()).toEqual(
        expect.objectContaining({
          iconType: 'cloud',
          linkTo: 'connector-hub',
          stat: connectors.length,
        })
      );
    });
  });
});
