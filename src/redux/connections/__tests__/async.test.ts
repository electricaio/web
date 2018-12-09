import { withAuth } from '../../util';
import { ConnectionModal, ConnectionTypes, AuthorizationBasicType } from '../types';
import { createConnection, fetchConnections } from '../async';

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
    name: 'basic',
    password: 'password',
    username: 'username',
  };

  let dispatchMock: jest.Mock;
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      createConnection: (data: ConnectionModal) => Promise.resolve({ data }),
      fetchConnections: () => Promise.resolve({ data: testConnection }),
      createConnectionAuthorization: () => Promise.resolve(),
    };
    dispatchMock = jest.fn();
    (withAuth as any).mockImplementation((callback: any) => {
      callback(mockApi, dispatchMock);
    });
  });

  describe('createConnection', () => {
    it('dispatches CREATE_CONNECTION action', async () => {
      await createConnection(testConnection, testAuthType)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];

      expect(firstDispatchCall.type).toEqual(ConnectionTypes.CREATE_CONNECTION);
    });

    it('dispatch CREATE_ACCESS_KEY_SUCCESS action', async () => {
      await createConnection(testConnection, testAuthType)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[2][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.CREATE_CONNECTION_SUCCESS);
    });

    it('dispatch response payload to reducers', async () => {
      await createConnection(testConnection, testAuthType)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[2][0];
      expect(successDispatchCall.payload).toEqual(testConnection);
    });
  });

  describe('fetchConnections', () => {
    it('dispatches FETCH_CONNECTIONS action', async () => {
      await fetchConnections(1)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(ConnectionTypes.FETCH_CONNECTIONS);
    });

    it('dispatches access keys to reducer', async () => {
      await fetchConnections(1)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[2][0];
      expect(firstDispatchCall.payload).toEqual(testConnection);
    });

    it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
      await fetchConnections(1)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[2][0];
      expect(successDispatchCall.type).toEqual(ConnectionTypes.FETCH_CONNECTIONS_SUCCESS);
    });
  });
});
