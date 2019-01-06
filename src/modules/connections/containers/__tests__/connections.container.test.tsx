import React from 'react';
import { shallow } from 'enzyme';
import { Connections, PropsFromDispatch } from '../connections.container';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { UserDto } from '../../../../redux/auth/types';
import { ConnectionsComponent } from '../../components/connections';

describe('Connections Container', () => {
  const connectorId = 1;
  const connectorName = 'Salesforce Customer API 2.0';

  const user: UserDto = {
    firstName: 'admin',
    email: 'admin@electrica.io',
    id: 1,
    lastName: 'admin',
    organizationId: 0,
  };

  const connections: ConnectionModal[] = [
    {
      connectorId,
      id: 1,
      name: 'Uber',
      accessKeyId: 1,
    },
  ];

  const accessKeys: ApiKeyModal[] = [
    {
      id: 1,
      name: 'Development',
      key: 'Development',
      createdAt: 'date',
    },
  ];

  const connectors: ConnectorModal[] = [
    {
      typeId: 1,
      authorizationType: 'None',
      name: connectorName,
      resource: 'customer',
      version: '2.0',
      namespace: 'salesforce',
      properties: {
        url: 'https://www.salesforce.com',
        sdk_url: 'url_to_sdk',
        image_url: 'string',
        description: 'This connector allows you to connect to SalesForce CRM system.',
      },
      id: connectorId,
      ern: 'ern://salesforce:customer:2_0',
      revisionVersion: 0,
    },
  ];

  const matchProps = {
    params: { connectorId: connectorId.toString() },
    isExact: true,
    path: '',
    url: '',
  };

  let actions: PropsFromDispatch;

  beforeEach(() => {
    actions = {
      fetchConnector: jest.fn(),
      updateConnection: jest.fn(),
      fetchConnections: jest.fn(),
      updateAuthorization: jest.fn(),
      fetchKeys: jest.fn(),
      createConnection: jest.fn(),
      deleteConnection: jest.fn(),
    };

    this.component = shallow(
      <Connections
        authorizations={[]}
        user={user}
        match={matchProps}
        accessKeys={accessKeys}
        connections={connections}
        connectors={connectors}
        {...actions}
      />
    );
  });

  it('Contains a breadcrumb component', () => {
    expect(this.component.find(BreadcrumbComponent)).toHaveLength(1);
  });

  it('passes in the breadcrumb map with connector id and name', () => {
    const breadcrumbMap = this.component.find(BreadcrumbComponent).prop('breadcrumbNameMap');
    expect(breadcrumbMap).toHaveProperty('/connector-hub');
    expect(breadcrumbMap).toHaveProperty(`/connector-hub/${connectorId}`);
  });

  it('renders connections component', () => {
    const connectionsComponent = this.component.find(ConnectionsComponent);
    expect(connectionsComponent).toHaveLength(1);
    expect(connectionsComponent.prop('accessKeys')).toEqual(accessKeys);
    expect(connectionsComponent.prop('connections')).toEqual(connections);
  });

  it('passes createConnection to connections component', () => {
    const connectionsComponent = this.component.find(ConnectionsComponent);
    expect(connectionsComponent.prop('createConnection')).toEqual(actions.createConnection);
  });

  it('passes updateConnection to connections component', () => {
    const connectionsComponent = this.component.find(ConnectionsComponent);
    expect(connectionsComponent.prop('updateConnection')).toEqual(actions.updateConnection);
  });

  it('passes deleteConnection to connections component', () => {
    const connectionsComponent = this.component.find(ConnectionsComponent);
    expect(connectionsComponent.prop('deleteConnection')).toEqual(actions.deleteConnection);
  });
});
