import React from 'react';
import { shallow } from 'enzyme';
import { AsyncComponent } from '../../../../components/async-component/async-component';
import { ConnectionFormComponent } from '../edit-connection-form.container';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import {
  ConnectionForm,
  DefaultFormValues,
} from '../../components/connection-form/connection-form';

describe('Connector Form Container', () => {
  let fetchAuthorizationMock = jest.fn();
  const authorizationsId = 12;

  const authorizations: any = [
    {
      id: authorizationsId,
      token: '122',
    },
  ];

  const connectionProperties = {
    hello: 'world',
  };
  const testConnection: ConnectionModal = {
    id: 1,
    name: 'Uber',
    accessKeyId: 1,
    connectorId: 1,
    authorizationId: authorizationsId,
    properties: connectionProperties,
  };

  const testConnector: ConnectorModal = {
    typeId: 1,
    authorizationType: 'Token',
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

  const accessKeys: ApiKeyModal[] = [];
  beforeEach(() => {
    fetchAuthorizationMock = jest.fn();
    this.component = shallow(
      <ConnectionFormComponent
        accessKeys={accessKeys}
        authorizations={authorizations}
        fetchAuthorization={fetchAuthorizationMock}
        connection={testConnection}
        connector={testConnector}
      />
    );
  });

  describe('async component', () => {
    it('renders the component', () => {
      expect(this.component.find(AsyncComponent)).toHaveLength(1);
    });

    it('passes fetchAuthorization action', () => {
      const actions = this.component.find(AsyncComponent).prop('getAsyncActions');
      actions();
      expect(fetchAuthorizationMock).toBeCalledWith(
        testConnection.authorizationId,
        testConnector.authorizationType
      );
    });
  });

  describe('ConnectionForm', () => {
    it('passes connector', () => {
      expect(
        this.component
          .find(AsyncComponent)
          .find(ConnectionForm)
          .prop('connector')
      ).toEqual(testConnector);
    });
    it('passes edit mode flag', () => {
      expect(
        this.component
          .find(AsyncComponent)
          .find(ConnectionForm)
          .prop('inEditMode')
      ).toBeTruthy();
    });

    it('passes access keys', () => {
      expect(this.component.find(ConnectionForm).prop('accessKeys')).toEqual(accessKeys);
    });

    it('passes default values keys with name value properties', () => {
      const defaultValues: DefaultFormValues = {
        connectionName: testConnection.name,
        accessKeyId: testConnection.accessKeyId,
        authorization: authorizations[0],
        properties: [
          {
            name: 'hello',
            value: 'world',
          },
        ],
      };
      expect(this.component.find(ConnectionForm).prop('defaultFormValues')).toEqual(defaultValues);
    });
  });
});
