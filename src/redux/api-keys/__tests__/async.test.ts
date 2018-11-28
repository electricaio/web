import { createKey, fetchKeys, refreshKey, removeKey, getKey } from '../async';
import { ApiKeysTypes, ApiKeyModal } from '../types';

import { withAuth } from '../../util';

jest.mock('../../../modules/utils/api');
jest.mock('../../util');

describe('Api Key Actions', () => {
  const testAccessKey: ApiKeyModal = {
    name: 'Development',
    userId: 2,
  };

  let dispatchMock: any;
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      createAccessKey: (data: ApiKeyModal) => Promise.resolve({ data }),
      getAccessKeys: () => Promise.resolve({ data: testAccessKey }),
      getAccessKey: () => Promise.resolve({ data: testAccessKey }),
      refreshAccessKey: () => Promise.resolve({ data: testAccessKey }),
      removeAccessKey: () => Promise.resolve({ data: testAccessKey }),
    };
    dispatchMock = jest.fn();
    (withAuth as any).mockImplementation((callback: any) => {
      callback(mockApi, dispatchMock);
    });
  });

  describe('createKey', () => {
    describe('on api success', () => {
      it('dispatches CREATE_ACCESS_KEY action', async () => {
        await createKey(testAccessKey);
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.CREATE_ACCESS_KEY);
      });

      it('dispatches CREATE_ACCESS_KEY action with the new access key data', async () => {
        await createKey(testAccessKey);
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.payload).toEqual(testAccessKey);
      });

      it('dispatch CREATE_ACCESS_KEY_SUCCESS action', async () => {
        await createKey(testAccessKey);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.CREATE_ACCESS_KEY_SUCCESS);
      });

      it('dispatch response payload to reducers', async () => {
        await createKey(testAccessKey);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(testAccessKey);
      });
    });
  });

  describe('fetchKeys', () => {
    describe('on api success', () => {
      it('dispatches FETCH_ACCESS_KEYS action', async () => {
        await fetchKeys(1);
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEYS);
      });

      it('dispatches access keys to reducer', async () => {
        await fetchKeys(1);
        const firstDispatchCall = dispatchMock.mock.calls[1][0];
        expect(firstDispatchCall.payload).toEqual(testAccessKey);
      });

      it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
        await fetchKeys(1);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEYS_SUCCESS);
      });
    });
  });

  describe('getKey', () => {
    describe('on api success', () => {
      it('dispatches FETCH_ACCESS_KEY action', async () => {
        await getKey(1)(dispatchMock);
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEY);
      });

      it('dispatch FETCH_ACCESS_KEY_SUCCESS action', async () => {
        await getKey(1)(dispatchMock);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEY_SUCCESS);
      });

      it('dispatch new access key response payload to reducers', async () => {
        await getKey(1)(dispatchMock);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(testAccessKey);
      });
    });
  });

  describe('refreshKey', () => {
    describe('on api success', () => {
      it('dispatches FETCH_ACCESS_KEY action since we are updating the key modal', async () => {
        await refreshKey(1);
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEY);
      });

      it('dispatch FETCH_ACCESS_KEY_SUCCESS action', async () => {
        await refreshKey(1);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEY_SUCCESS);
      });

      it('dispatch new access key response payload to reducers', async () => {
        await refreshKey(1);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(testAccessKey);
      });
    });
  });

  describe('removeKey', () => {
    describe('on api success', () => {
      it('dispatches REMOVE_ACCESS_KEY action', async () => {
        await removeKey(2);
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.REMOVE_ACCESS_KEY);
      });

      it('dispatch REMOVE_ACCESS_KEY_SUCCESS action', async () => {
        await removeKey(2);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.REMOVE_ACCESS_KEY_SUCCESS);
      });

      it('dispatch new access key response payload to reducers', async () => {
        await removeKey(2);
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(testAccessKey);
      });
    });
  });
});
