import { connectionsReducer } from '../reducer';
import { ConnectionTypes, ConnectionsState, ConnectionModal } from '../types';

const initialState: ConnectionsState = {
  data: [],
};

describe('connections reducer', () => {
  describe('fetch connections', () => {
    it('sets data to the payload that is enterign', () => {
      const fetchedData: ConnectionModal[] = [
        {
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
      const stateWithConnection = {
        data: [
          {
            accessKeyId: 1,
            connectorId: 1,
            authorizationId: 1,
            name: 'connection',
          },
        ],
      };
      expect(
        connectionsReducer(stateWithConnection, {
          type: ConnectionTypes.DELETE_CONNECTION_SUCCESS,
          payload: 1,
        })
      ).toEqual({
        ...initialState,
        data: [],
      });
    });
  });
});
