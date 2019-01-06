import { connectionsReducer } from '../reducer';
import { ConnectionTypes, ConnectionsState, ConnectionModal } from '../types';

const initialState: ConnectionsState = {
  data: [],
  authorizations: [],
};

const authId = 1;
const testAuth = {
  id: authId,
  token: 'test',
  username: 'username',
  password: 'password',
};

describe('connections reducer', () => {
  describe('fetch connections', () => {
    it('sets data to the payload that is enterign', () => {
      const fetchedData: ConnectionModal[] = [
        {
          id: 123,
          accessKeyId: 1,
          connectorId: 1,
          authorizationId: 1,
          name: 'connection',
        },
      ];
      expect(
        connectionsReducer(initialState, {
          type: ConnectionTypes.FETCH_CONNECTIONS_SUCCESS,
          payload: fetchedData,
        })
      ).toEqual({
        ...initialState,
        data: fetchedData,
      });
    });
  });

  describe('create connection', () => {
    it('concats connections to the data state', () => {
      expect(
        connectionsReducer(initialState, {
          type: ConnectionTypes.CREATE_CONNECTION_SUCCESS,
          payload: [
            {
              accessKeyId: 1,
              connectorId: 1,
              authorizationId: 1,
              name: 'connection',
            },
          ],
        })
      ).toEqual({
        ...initialState,
        data: [
          {
            accessKeyId: 1,
            connectorId: 1,
            authorizationId: 1,
            name: 'connection',
          },
        ],
      });
    });
  });
  describe('delete connection', () => {
    it('removes the connection from the state', () => {
      const connectionId = 123;
      const stateWithConnection: ConnectionsState = {
        data: [
          {
            id: connectionId,
            accessKeyId: 1,
            connectorId: 1,
            authorizationId: 1,
            name: 'connection',
          },
        ],
        authorizations: [],
      };
      expect(
        connectionsReducer(stateWithConnection, {
          type: ConnectionTypes.DELETE_CONNECTION_SUCCESS,
          payload: connectionId,
        })
      ).toEqual({
        ...initialState,
        data: [],
      });
    });
  });
  describe('update connection', () => {
    it('update the connection from the payload', () => {
      const connectionId = 123;
      const connection = {
        id: connectionId,
        accessKeyId: 1,
        connectorId: 1,
        authorizationId: 1,
        name: 'new connection',
      };

      const updatedConnectionProperties = {
        id: connectionId,
        name: 'updated connection',
      };
      const stateWithConnection: ConnectionsState = {
        data: [connection],
        authorizations: [],
      };
      expect(
        connectionsReducer(stateWithConnection, {
          type: ConnectionTypes.UPDATE_CONNECTION_SUCCESS,
          payload: updatedConnectionProperties,
        })
      ).toEqual({
        ...initialState,
        data: [{ ...connection, ...updatedConnectionProperties }],
      });
    });
  });
  describe('update authorization', () => {
    it('updates the authorizations from the payload', () => {
      const updatedAuth = {
        id: authId,
        token: 'updated token',
      };
      const stateWithConnection: ConnectionsState = {
        data: [],
        authorizations: [testAuth],
      };
      expect(
        connectionsReducer(stateWithConnection, {
          type: ConnectionTypes.UPDATE_AUTHORIZATION,
          payload: updatedAuth,
        })
      ).toEqual({
        ...initialState,
        data: [],
        authorizations: [{ ...testAuth, ...updatedAuth }],
      });
    });
    describe('get authorization', () => {
      it('concat the authorization to the authorization state', () => {
        const updatedAuth = {
          username: 'new username',
        };
        const stateWithConnection: ConnectionsState = {
          data: [],
          authorizations: [],
        };
        expect(
          connectionsReducer(stateWithConnection, {
            type: ConnectionTypes.FETCH_AUTHORIZATION_SUCCESS,
            payload: testAuth,
          })
        ).toEqual({
          ...initialState,
          data: [],
          authorizations: [{ ...updatedAuth, ...testAuth }],
        });
      });
    });
  });
});
