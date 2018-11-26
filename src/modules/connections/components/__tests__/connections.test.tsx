import React from 'react';
import { mount } from 'enzyme';
import { ConnectionsComponent } from '../connections';
import { Header } from '../../../ui-kit/header';
import { ConnectionsTable } from '../table/table';
import { Button } from 'antd';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ConnectorModal } from '../../../../redux/connector-hub/types';

describe('connections', () => {
  const connections: ConnectionModal[] = [
    {
      id: 1,
      name: 'Uber',
      accessKeyId: 1,
      connectorId: 1,
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

  const connector: ConnectorModal = {
    typeId: 1,
    authorizationType: 'None',
    name: 'SalesForce CRM API 2.0',
    resource: 'customer',
    version: '2.0',
    namespace: 'salesforce',
    properties: {
      url: 'https://www.salesforce.com',
      sdk_url: 'url_to_sdk',
      image_url: 'string',
      description: 'This connector allows you to connect to SalesForce CRM system.',
    },
    id: 4,
    ern: 'ern://salesforce:customer:2_0',
    revisionVersion: 0,
  };

  beforeEach(() => {
    this.component = mount(
      <ConnectionsComponent
        accessKeys={accessKeys}
        connections={connections}
        connector={connector}
      />
    );
  });

  it('uses connector name in Header', () => {
    expect(this.component.find(Header).text()).toContain(connector.name);
  });

  it('renders table', () => {
    expect(this.component.find(ConnectionsTable)).toHaveLength(1);
  });

  it('renders table with access keys and connections', () => {
    const table = this.component.find(ConnectionsTable);
    expect(table.prop('connections')).toEqual(connections);
    expect(table.prop('accessKeys')).toEqual(accessKeys);
  });

  it('renders primary button', () => {
    const btn = this.component.find(Button);
    expect(btn).toHaveLength(1);
    expect(btn.prop('size')).toEqual('large');
    expect(btn.text()).toEqual('Add Connection');
  });
});
