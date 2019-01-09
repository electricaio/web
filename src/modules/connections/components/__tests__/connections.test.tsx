import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ConnectionsComponent } from '../connections';
import { Header } from '../../../ui-kit/header';
import { ConnectionsTable } from '../table/table';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { ButtonActionModal } from '../../../ui-kit/modal-button-action/modal-button-action';
import { ConnectionForm } from '../connection-form/connection-form';
import { StyledButton } from '../../../ui-kit/button';

describe('connections', () => {
  const authorizationId = 2;
  const connectionId = 2123;
  const connections: ConnectionModal[] = [
    {
      authorizationId,
      id: connectionId,
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

  const connectorBasic: ConnectorModal = {
    typeId: 1,
    authorizationType: 'Basic',
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

  const connectorToken: ConnectorModal = {
    ...connectorBasic,
    authorizationType: 'Token',
  };

  const noAuthorization: ConnectorModal = {
    ...connectorBasic,
    authorizationType: 'None',
  };

  const connectionName = 'Test Connection';

  let createConnectionMock: jest.Mock;
  let deleteConnectionMock: jest.Mock;
  let updateConnectionMock: jest.Mock;
  let updateAuthorizationMock: jest.Mock;

  const createConnectionComponent = (props = {}): ShallowWrapper => {
    return shallow(
      <ConnectionsComponent
        authorizations={[]}
        deleteConnection={deleteConnectionMock}
        updateAuthorization={updateAuthorizationMock}
        updateConnection={updateConnectionMock}
        createConnection={createConnectionMock}
        accessKeys={accessKeys}
        connections={connections}
        connector={connectorBasic}
        {...props}
      />
    );
  };

  beforeEach(() => {
    createConnectionMock = jest.fn();
    updateAuthorizationMock = jest.fn();
    deleteConnectionMock = jest.fn();
    updateConnectionMock = jest.fn();
    this.component = createConnectionComponent();
  });

  it('renders a Header', () => {
    expect(this.component.find(Header)).toHaveLength(1);
  });

  it('renders table', () => {
    expect(this.component.find(ConnectionsTable)).toHaveLength(1);
  });

  it('renders table with access keys and connections', () => {
    const table = this.component.find(ConnectionsTable);
    expect(table.prop('connections')).toEqual(connections);
    expect(table.prop('accessKeys')).toEqual(accessKeys);
  });

  it('renders ButtonActionModal', () => {
    const buttonModal = this.component.find(ButtonActionModal);
    expect(buttonModal).toHaveLength(1);
  });

  it('passes a connections form to ButtonActionModal', () => {
    const buttonModal = this.component.find(ButtonActionModal);
    expect(buttonModal.prop('formComponent')).toEqual(
      <ConnectionForm accessKeys={accessKeys} connector={connectorBasic} />
    );
  });

  it('renders primary button', () => {
    const btn = this.component.find(StyledButton);
    expect(btn).toHaveLength(1);
    expect(btn.prop('size')).toEqual('large');
  });

  it('passes handleCommit to ButtonActionModal', () => {
    const buttonModal = this.component.find(ButtonActionModal);
    expect(buttonModal.prop('onCommit')).toEqual(this.component.instance().handleCommit);
  });

  it('handleCommit calls createConnection with new connection and basic authorizationType', () => {
    const basicCreds = {
      password: 'admin',
      username: 'admin',
    };

    const basicFormValue: any = {
      connectionName,
      properties: [],
      accessKeyId: 1,
      ...basicCreds,
    };
    const connectionValue: ConnectionModal = {
      accessKeyId: 1,
      properties: {},
      connectorId: connectorBasic.id,
      name: connectionName,
    };

    this.component.instance().handleCommit(basicFormValue);
    expect(createConnectionMock).toBeCalledWith(connectionValue, connectorBasic, basicCreds);
  });

  it('handleCommit calls createConnection with new connection and token authorizationType', () => {
    const component = createConnectionComponent({ connector: connectorToken });
    const accessKeyId = 10;
    const tokenCreds = {
      token: '12345',
    };

    const tokenFormValue: any = {
      accessKeyId,
      connectionName,
      properties: [],
      ...tokenCreds,
    };
    const connectionValue: ConnectionModal = {
      accessKeyId,
      properties: {},
      connectorId: connectorBasic.id,
      name: connectionName,
    };

    (component.instance() as any).handleCommit(tokenFormValue);
    expect(createConnectionMock).toBeCalledWith(connectionValue, connectorToken, tokenCreds);
  });

  it('handleEdit calls updateConnection with updated connection', async () => {
    const component = createConnectionComponent({ connector: connectorToken });
    const accessKeyId = 10;

    const formValues: any = {
      accessKeyId,
      connectionName,
      properties: [],
    };
    const connectionValue: ConnectionModal = {
      ...connections[0],
      accessKeyId,
      properties: {},
      connectorId: connectorBasic.id,
      name: connectionName,
    };

    await (component.instance() as any).handleEdit(connectionId, formValues);
    expect(updateConnectionMock).toBeCalledWith(connectionId, connectionValue);
  });

  it('handleEdit calls updateAuthorization', async () => {
    const component = createConnectionComponent({ connector: connectorToken });
    const accessKeyId = 10;

    const formValues: any = {
      accessKeyId,
      connectionName,
      properties: [],
    };

    await (component.instance() as any).handleEdit(connectionId, formValues).then;
    expect(updateAuthorizationMock).toBeCalled();
  });

  it('handleEdit does not call updateAuthorization if there is no authorization', async () => {
    const component = createConnectionComponent({ connector: noAuthorization });
    const accessKeyId = 10;

    const formValues: any = {
      accessKeyId,
      connectionName,
      properties: [],
    };

    await (component.instance() as any).handleEdit(connectionId, formValues);
    expect(updateAuthorizationMock).not.toBeCalled();
  });

  it('handleEdit uses access key property from connection if the form value is undefined', async () => {
    const component = createConnectionComponent({ connector: noAuthorization });

    const formValues: any = {
      connectionName,
      accessKeyId: undefined,
      properties: [],
    };

    await (component.instance() as any).handleEdit(connectionId, formValues);
    expect(updateConnectionMock ).toBeCalledWith(connectionId, expect.objectContaining({
      accessKeyId: connections[0].accessKeyId,
    }));
  });

  it('handleCommit calls createConnection with properties', () => {
    const component = createConnectionComponent({ connector: connectorToken });
    const accessKeyId = 10;
    const tokenCreds = {
      token: '12345',
    };

    const properties = {
      testName: 'value',
    };

    const formProperties = [
      {
        name: 'testName',
        value: 'value',
      },
    ];

    const tokenFormValue = {
      accessKeyId,
      connectionName,
      properties: formProperties,
      ...tokenCreds,
    };
    const connectionValue: ConnectionModal = {
      accessKeyId,
      properties,
      connectorId: connectorBasic.id,
      name: connectionName,
    };

    (component.instance() as any).handleCommit(tokenFormValue);
    expect(createConnectionMock).toBeCalledWith(connectionValue, connectorToken, tokenCreds);
  });

  it('handleDelete calls deleteConnection with connection id', () => {
    const component = createConnectionComponent({ connector: connectorToken });
    const connectionId = 100;
    (component.instance() as any).handleDelete(connectionId);
    expect(deleteConnectionMock).toBeCalledWith(connectionId);
  });
});
