import { connectionsReducer } from '../reducer';
import { ConnectionTypes, ConnectionsState } from '../types';

const initialState: ConnectionsState = {
  data: [],
  loading: false,
};

describe('connections reducer', () => {
  describe('fetch connections', () => {
    it('sets loading to false when successful connections', () => {
      expect(
        connectionsReducer(initialState, {
          type: ConnectionTypes.FETCH_CONNECTIONS_SUCCESS,
          payload: [],
        })
      ).toEqual({
        ...initialState,
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
});
