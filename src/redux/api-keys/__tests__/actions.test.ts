import { createKey, fetchKeys, refreshKey, removeKey, getKey } from '../actions';
import { ApiKeysTypes, ApiKeyModal } from '../types';

import * as api from '../../../modules/utils/api';

jest.mock('../../../modules/utils/api');

describe('Api Key Actions', () => {
  describe('createKey', () => {
    const newAccessKey: ApiKeyModal = {
      name: 'Development',
      userId: 2,
    };

    describe('on api success', () => {
      let dispatchMock: any = null;
      const response = { name: 'chris' };

      const mockDispatchAndFetch = () => {
        dispatchMock = jest.fn();
        const createAccessKeyMock = jest.spyOn(api, 'createAccessKey');
        createAccessKeyMock.mockImplementation(() => Promise.resolve({ data: response }));
        return createKey(newAccessKey)(dispatchMock);
      };

      it('dispatches CREATE_ACCESS_KEY action', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.CREATE_ACCESS_KEY);
      });

      it('dispatches CREATE_ACCESS_KEY action with the new access key data', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.payload).toEqual(newAccessKey);
      });

      it('dispatch CREATE_ACCESS_KEY_SUCCESS action', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.CREATE_ACCESS_KEY_SUCCESS);
      });

      it('dispatch response payload to reducers', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(response);
      });
    });
  });

  describe('fetchKeys', () => {
    describe('on api success', () => {
      let dispatchMock: any = null;
      const response = { name: 'chris' };

      const mockDispatchAndFetch = () => {
        dispatchMock = jest.fn();
        const getAccessKeyMock = jest.spyOn(api, 'getAccessKeys');
        getAccessKeyMock.mockImplementation(() => Promise.resolve({ data: [response] }));
        return fetchKeys(1)(dispatchMock);
      };

      it('dispatches FETCH_ACCESS_KEYS action', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEYS);
      });

      it('dispatches access keys to reducer', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[1][0];
        expect(firstDispatchCall.payload).toEqual([response]);
      });

      it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEYS_SUCCESS);
      });
    });
  });

  describe('getKey', () => {
    describe('on api success', () => {
      let dispatchMock: any = null;
      const response = { accessKey: 'this is the new key' };

      const mockDispatchAndFetch = () => {
        dispatchMock = jest.fn();
        const getAccessKeyMock = jest.spyOn(api, 'getAccessKey');
        getAccessKeyMock.mockImplementation(() => Promise.resolve({ data: response }));
        return getKey(1)(dispatchMock);
      };

      it('dispatches FETCH_ACCESS_KEY action', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEY);
      });

      it('dispatch FETCH_ACCESS_KEY_SUCCESS action', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.FETCH_ACCESS_KEY_SUCCESS);
      });

      it('dispatch new access key response payload to reducers', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(response);
      });
    });
  });

  describe('refreshKey', () => {
    describe('on api success', () => {
      let dispatchMock: any = null;
      const response = { accessKey: 'this is the new key' };

      const mockDispatchAndFetch = () => {
        dispatchMock = jest.fn();
        const refreshAccessKeyMock = jest.spyOn(api, 'refreshAccessKey');
        refreshAccessKeyMock.mockImplementation(() => Promise.resolve({ data: response }));
        return refreshKey(1)(dispatchMock);
      };

      it('dispatches REFRESH_KEY action', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.REFRESH_KEY);
      });

      it('dispatch REFRESH_KEY_SUCCESS action', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.REFRESH_KEY_SUCCESS);
      });

      it('dispatch new access key response payload to reducers', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(response);
      });
    });
  });

  describe('removeKey', () => {
    describe('on api success', () => {
      let dispatchMock: any = null;
      const response = { accessKey: 'this is the new key' };

      const mockDispatchAndFetch = () => {
        dispatchMock = jest.fn();
        const removeAccessKeyMock = jest.spyOn(api, 'removeAccessKey');
        removeAccessKeyMock.mockImplementation(() => Promise.resolve({ data: response }));
        return removeKey(2)(dispatchMock);
      };

      it('dispatches REMOVE_ACCESS_KEY action', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];
        expect(firstDispatchCall.type).toEqual(ApiKeysTypes.REMOVE_ACCESS_KEY);
      });

      it('dispatch REMOVE_ACCESS_KEY_SUCCESS action', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ApiKeysTypes.REMOVE_ACCESS_KEY_SUCCESS);
      });

      it('dispatch new access key response payload to reducers', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(response);
      });
    });
  });
});
