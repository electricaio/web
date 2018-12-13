import { withAuth } from '../../util';
import { ConnectionModal, ConnectionTypes, AuthorizationBasicType } from '../types';
import { createConnection, fetchConnections, deleteConnection } from '../async';
import { ConnectorModal } from '../../connector-hub/types';

jest.mock('../../../modules/utils/api');
jest.mock('../../util');

describe('Connection Async Actions', () => {
  const testConnection: ConnectionModal = {
    id: 1,
    name: 'Uber',
    accessKeyId: 1,
    connectorId: 1,
  };
  const testAuthType: AuthorizationBasicType = {
    password: 'password',
    username: 'username',
  };

  const testConnector: ConnectorModal = {
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

  let dispatchMock: jest.Mock;
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      createConnection: jest.fn(() => Promise.resolve({ data: testConnection })),
      fetchConnections: jest.fn(() => Promise.resolve({ data: [testConnection] })),
      deleteConnection: jest.fn(() => Promise.resolve()),
      createConnectionAuthorization: jest.fn(() => Promise.resolve()),
    };
    dispatchMock = jest.fn();
    (withAuth as any).mockImplementation((_: any, callback: any) => {
      callback(mockApi, dispatchMock);
    });
  });

  describe('createConnection', () => {
    it('dispatches CREATE_CONNECTION action', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];

      expect(firstDispatchCall.type).toEqual(ConnectionTypes.CREATE_CONNECTION);
    });

    it('dispatch CREATE_ACCESS_KEY_SUCCESS action', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.CREATE_CONNECTION_SUCCESS);
    });

    it('dispatch response payload to reducers', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.payload).toEqual(testConnection);
    });

    it('calls createConnectionAuthorization with the result of the createConnection', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      expect(mockApi.createConnectionAuthorization).toBeCalledWith(
        testConnection,
        testConnector.authorizationType,
        testAuthType
      );
      const successDispatchCall = dispatchMock.mock.calls[1][0];

      expect(successDispatchCall.payload).toEqual(testConnection);
    });
  });

  describe('deleteConnection', () => {
    it('dispatch DELETE_CONNECTION_SUCCESS action', async () => {
      await deleteConnection(testConnection.id)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];

      expect(successDispatchCall.type).toEqual(ConnectionTypes.DELETE_CONNECTION_SUCCESS);
    });

    it('dispatch connection id payload to reducers', async () => {
      await deleteConnection(testConnection.id)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.payload).toEqual(testConnection.id);
    });
  });

  describe('fetchConnections', () => {
    it('dispatches FETCH_CONNECTIONS action', async () => {
      await fetchConnections(1, 1)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(ConnectionTypes.FETCH_CONNECTIONS);
    });

    it('dispatches access keys to reducer', async () => {
      await fetchConnections(1, 1)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[1][0];
      expect(firstDispatchCall.payload).toEqual([testConnection]);
    });

    it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
      await fetchConnections(1, 1)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.FETCH_CONNECTIONS_SUCCESS);
    });

    it('call api with user id and connector id', async () => {
      const userId = 123;
      const orgId = 1;
      await fetchConnections(userId, orgId)(dispatchMock);
      expect(mockApi.fetchConnections).toBeCalledWith(userId, orgId);
    });
  });
});
