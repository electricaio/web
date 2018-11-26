import React from 'react';
import { mount } from 'enzyme';
import { Connections } from '../connections.container';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { Spin } from 'antd';
import { ConnectionsComponent } from '../../components/connections';
import { MemoryRouter } from 'react-router';

describe('Connections Container', () => {
  const connectorId = 1;
  const connectorName = 'Salesforce Customer API 2.0';
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

  beforeEach(() => {
    const actions = {
      fetchConnectionsAction: jest.fn(),
      getKeyAction: jest.fn(),
    };
    const matchProps = {
      params: { connectorId: connectorId.toString() },
      isExact: true,
      path: '',
      url: '',
    };

    this.component = mount(
      <MemoryRouter>
        <Connections
          match={matchProps}
          accessKeys={accessKeys}
          connections={connections}
          connectors={connectors}
          loading
          {...actions}
        />
      </MemoryRouter>
    );
  });
  it('Contains a breadcrumb component', () => {
    expect(this.component.find(BreadcrumbComponent)).toHaveLength(1);
  });

  it('passes in the breadcrumb map with connector id and name', () => {
    const breadcrumbNameMap = {
      '/connector-hub': 'Connector Hub',
      [`/connector-hub/${connectorId}`]: connectorName,
    };
    expect(this.component.find(BreadcrumbComponent).prop('breadcrumbNameMap')).toEqual(
      breadcrumbNameMap
    );
  });

  it('spinning is rendered if component is loading', () => {
    expect(
      this.component
        .find(Spin)
        .first()
        .prop('spinning')
    ).toBeTruthy();
  });

  it('renders connections component', () => {
    const connectionsComponent = this.component.find(Spin).find(ConnectionsComponent);
    expect(connectionsComponent).toHaveLength(1);
    expect(connectionsComponent.prop('accessKeys')).toEqual(accessKeys);
    expect(connectionsComponent.prop('connections')).toEqual(connections);
  });

  it('passes the connector that is loaded from the match param value', () => {
    const connectionsComponent = this.component.find(Spin).find(ConnectionsComponent);
    expect(connectionsComponent.prop('connector')).toEqual(connectors[0]);
  });
});
