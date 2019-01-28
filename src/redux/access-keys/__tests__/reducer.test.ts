import { accessKeysReducer } from '../reducer';
import { AccessKeysTypes, AccessKeysState } from '../types';

const initialState: AccessKeysState = {
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

describe('access keys reducer', () => {
  describe('fetch access keys', () => {
    it('handles successful featch access keys', () => {
      expect(
        accessKeysReducer(initialState, {
          type: AccessKeysTypes.FETCH_ACCESS_KEYS_SUCCESS,
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

  describe('featch access key', () => {
    it('handles successful featch access key', () => {
      expect(
        accessKeysReducer(initialState, {
          type: AccessKeysTypes.FETCH_ACCESS_KEY_SUCCESS,
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

  describe('remove access key', () => {
    it('handles successful 1 remove access key', () => {
      expect(
        accessKeysReducer(initialState, {
          type: AccessKeysTypes.REMOVE_ACCESS_KEY_SUCCESS,
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
