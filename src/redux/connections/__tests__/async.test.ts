import { withAuth } from '../../util';
import { ConnectionModal, ConnectionTypes, AuthorizationType } from '../types';
import {
  createConnection,
  fetchConnections,
  deleteConnection,
  fetchConnection,
  updateConnection,
  updateAuthorization,
  fetchAuthorization,
} from '../async';
import { ConnectorModal } from '../../api-hub/types';

jest.mock('../../../modules/utils/api');
jest.mock('../../util');

describe('Connection Async Actions', () => {
  const testConnection: ConnectionModal = {
    id: 1,
    name: 'Uber',
    accessKeyId: 1,
    connectorId: 1,
  };

  const testConnectionResult: ConnectionModal = {
    id: 1,
    name: 'Salesforce',
    accessKeyId: 1,
    connectorId: 2,
  };
  const testAuthType: any = {
    password: 'password',
    username: 'username',
  };

  const testAuth: AuthorizationType = {
    password: 'password',
    username: 'username',
    token: '',
    id: 1,
    clientId: '',
    integrationId: '',
  };

  const testConnector: ConnectorModal = {
    id: 4,
    typeId: 1,
    authorizationType: 'Basic',
    name: 'SalesForce CRM API 2.0',
    version: '2.0',
    namespace: 'salesforce',
    ern: 'ern://salesforce:customer:2_0',
    revisionVersion: 0,
    resource: '',
  };

  let dispatchMock: jest.Mock;
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      createConnection: jest.fn(() => Promise.resolve({ data: testConnectionResult })),
      fetchConnections: jest.fn(() => Promise.resolve({ data: [testConnectionResult] })),
      fetchConnection: jest.fn(() => Promise.resolve({ data: testConnectionResult })),
      deleteConnection: jest.fn(() => Promise.resolve()),
      updateConnection: jest.fn(() => Promise.resolve({ data: testConnectionResult })),
      updateAuthorization: jest.fn(() => Promise.resolve({ data: testAuth })),
      fetchAuthorization: jest.fn(() => Promise.resolve({ data: testAuth })),
      createConnectionAuthorization: jest.fn(() => Promise.resolve({ data: testAuth })),
    };
    dispatchMock = jest.fn();
    (withAuth as any).mockImplementation((_: any, callback: any) => {
      return callback(mockApi, dispatchMock);
    });
  });

  describe('createConnection', () => {
    it('dispatch CREATE_ACCESS_KEY_SUCCESS action', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.CREATE_CONNECTION_SUCCESS);
    });

    it('dispatch response payload to reducers', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.payload).toEqual(testConnectionResult);
    });

    it('calls createConnectionAuthorization with the result of the createConnection', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      expect(mockApi.createConnectionAuthorization).toBeCalledWith(
        testConnectionResult,
        testConnector.authorizationType,
        testAuthType
      );
      const successDispatchCall = dispatchMock.mock.calls[0][0];

      expect(successDispatchCall.payload).toEqual(testConnectionResult);
    });

    it('calls fetchConnection after creating authorization', async () => {
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      expect(mockApi.fetchConnection).toBeCalledWith(testConnection.id);
    });

    it('does not call createConnectionAuthorization if there is no authorization', async () => {
      testConnector.authorizationType = 'None';
      await createConnection(testConnection, testConnector, testAuthType)(dispatchMock);
      expect(mockApi.createConnectionAuthorization).not.toBeCalled();
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
    it('dispatches the collection of connections to reducer', async () => {
      await fetchConnections(1, 1)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.payload).toEqual([testConnectionResult]);
    });

    it('dispatch FETCH_CONNECTIONS_SUCCESS action', async () => {
      await fetchConnections(1, 1)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.FETCH_CONNECTIONS_SUCCESS);
    });

    it('call api with user id and connector id', async () => {
      const userId = 123;
      const orgId = 1;
      await fetchConnections(userId, orgId)(dispatchMock);
      expect(mockApi.fetchConnections).toBeCalledWith(userId, orgId);
    });
  });

  describe('fetchConnection', () => {
    it('dispatches connection as an array to the reducer', async () => {
      await fetchConnection(1)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.payload).toEqual(testConnectionResult);
    });

    it('dispatch FETCH_CONNECTION_SUCCESS action', async () => {
      await fetchConnection(1)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.FETCH_CONNECTION_SUCCESS);
    });

    it('call api with connectionId', async () => {
      const connectionId = 123;
      await fetchConnection(connectionId)(dispatchMock);
      expect(mockApi.fetchConnection).toBeCalledWith(connectionId);
    });
  });

  describe('updateConnection', () => {
    it('dispatches UPDATE_CONNECTION action', async () => {
      await updateConnection(1, testConnection)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(ConnectionTypes.UPDATE_CONNECTION_SUCCESS);
    });

    it('dispatches updated connection as an array to the reducer', async () => {
      await updateConnection(1, testConnection)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.payload).toEqual(testConnectionResult);
    });

    it('call api with connectionId', async () => {
      const connectionId = 123;
      await updateConnection(connectionId, testConnection)(dispatchMock);
      expect(mockApi.updateConnection).toBeCalledWith(connectionId, testConnection);
    });
  });

  describe('updateAuthorization', () => {
    const authId = 1;
    const authName = 'basic';

    it('dispatches UPDATE_AUTHORIZATION action', async () => {
      await updateAuthorization(authId, authName, testAuth)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(ConnectionTypes.UPDATE_AUTHORIZATION);
    });

    it('dispatches updated connection as an array to the reducer', async () => {
      await updateAuthorization(authId, authName, testAuth)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.payload).toEqual(testAuth);
    });

    it('call api with connectionId', async () => {
      await updateAuthorization(authId, authName, testAuth)(dispatchMock);
      expect(mockApi.updateAuthorization).toBeCalledWith(authId, authName, testAuth);
    });
  });

  describe('fetchAuthorization', () => {
    const authId = 1;
    const authName = 'basic';

    it('dispatches FETCH_AUTHORIZATION_SUCCESS action', async () => {
      await fetchAuthorization(authId, authName)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(ConnectionTypes.FETCH_AUTHORIZATION_SUCCESS);
    });

    it('does not call api if auth name is None', async () => {
      await fetchAuthorization(authId, 'None')(dispatchMock);
      expect(mockApi.fetchAuthorization).not.toBeCalledWith(authId, authName);
    });

    it('dispatches updated connection as an array to the reducer', async () => {
      await fetchAuthorization(authId, authName)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.payload).toEqual(testAuth);
    });

    it('call api with connectionId', async () => {
      await fetchAuthorization(authId, authName)(dispatchMock);
      expect(mockApi.fetchAuthorization).toBeCalledWith(authId, authName);
    });
  });
});
