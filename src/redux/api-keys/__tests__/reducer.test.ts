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
};

describe('api keys reducer', () => {
  describe('fetch api keys', () => {
    it('handles successful featch api keys', () => {
      expect(
        apiKeysReducer(initialState, {
          type: ApiKeysTypes.FETCH_ACCESS_KEYS_SUCCESS,
          payload: [
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
        })
      ).toEqual({
        ...initialState,
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
      });
    });
  });

  describe('featch api key', () => {
    it('handles successful featch api key', () => {
      expect(
        apiKeysReducer(initialState, {
          type: ApiKeysTypes.FETCH_ACCESS_KEY_SUCCESS,
          payload: {
            id: 1,
            userId: 1,
            name: 'test2',
            key: '1234567',
          },
        })
      ).toEqual({
        ...initialState,
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
            key: '1234567',
          },
        ],
      });
    });
  });

  describe('remove api key', () => {
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
