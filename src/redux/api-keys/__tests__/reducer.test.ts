import { apiKeysReducer } from '../reducer';
import { ApiKeysTypes, ApiKeysState } from '../types';

const initialState: ApiKeysState = {
  data: [
    {
      id: 0,
      userId: 1,
      name: 'test1',
    },
    {
      id: 1,
      userId: 1,
      name: 'test2',
    },
  ],
  loading: false,
};

describe('api keys reducer', () => {
  describe('remove api key', () => {
    it('handles remove api key request', () => {
      expect(apiKeysReducer(initialState, { type: ApiKeysTypes.REMOVE_ACCESS_KEY })).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('handles successful 1 remove api key', () => {
      expect(
        apiKeysReducer(initialState, {
          type: ApiKeysTypes.REMOVE_ACCESS_KEY_SUCCESS,
          payload: {
            id: 1,
            userId: 1,
            name: 'test2',
          },
        })
      ).toEqual({
        ...initialState,
        loading: false,
        data: [
          {
            id: 0,
            userId: 1,
            name: 'test1',
          },
        ],
      });
    });
  });
});
