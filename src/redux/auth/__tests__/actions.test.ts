import { loginUser, isAuthenticated, logoutUser, fetchUser } from '../actions';

import * as api from '../../../modules/utils/api';
import { AuthActionTypes } from '../types';
import { CALL_HISTORY_METHOD } from 'connected-react-router';

jest.mock('../../../modules/utils/api');

describe('Auth', () => {
  describe('loginUser', () => {
    let dispatchMock: any = null;
    const username = 'some user';
    const password = 'password';

    const mockDispatchAndLoginUser = (apiResponse: () => void) => {
      dispatchMock = jest.fn();
      const loginMock = jest.spyOn(api, 'login');
      loginMock.mockImplementation((username: string, password: string) => apiResponse());
      return loginUser(username, password)(dispatchMock);
    };

    const successfulApiResponse = () => {
      return mockDispatchAndLoginUser(() => Promise.resolve({ data: { name: 'chris' } }));
    };

    const errorApiResponse = () => {
      return mockDispatchAndLoginUser(() => Promise.reject({ error: 'error' }));
    };

    describe('on api success', () => {
      it('dispatches LOGIN_USER action user with a username and password', async () => {
        await successfulApiResponse();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(AuthActionTypes.LOGIN_USER);
        expect(firstDispatchCall.payload).toEqual({ username, password });
      });

      it('dispatch LOGIN_SUCCESS action', async () => {
        await successfulApiResponse();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(AuthActionTypes.LOGIN_USER_SUCCESS);
      });

      it('updates local storage', async () => {
        await successfulApiResponse();

        expect(localStorage.setItem).toBeCalled();
      });

      it('routes to the home page  ', async () => {
        await successfulApiResponse();
        const routerDispatchCall = dispatchMock.mock.calls[2][0];
        expect(routerDispatchCall.payload).toEqual({ method: 'push', args: ['/api-keys'] });
      });
    });

    describe('on api error', () => {
      it('dispatches LOGIN_USER_ERROR action', async () => {
        await errorApiResponse();
        const errorDispatchCall = dispatchMock.mock.calls[1][0];
        expect(errorDispatchCall.type).toEqual(AuthActionTypes.LOGIN_USER_ERROR);
      });
    });
  });

  describe('logoutUser', () => {
    it('remove auth token from local storage', () => {
      const dispatchMock = jest.fn();
      logoutUser()(dispatchMock);
      expect(localStorage.removeItem).toBeCalled();
      expect(localStorage.removeItem).toBeCalledWith(api.AUTH_TOKENS_STORAGE_KEY);
    });
    it('routes to login page', () => {
      const dispatchMock = jest.fn();
      logoutUser()(dispatchMock);
      expect(dispatchMock).toBeCalled();
      const routeToLoginDispatch = dispatchMock.mock.calls[0][0];
      expect(routeToLoginDispatch.type).toEqual(CALL_HISTORY_METHOD);
      expect(routeToLoginDispatch.payload).toEqual({ method: 'push', args: ['/login'] });
    });
  });

  describe('isAuthenticated', () => {
    it('returns true if token is in local storage', () => {
      (localStorage.getItem as any).mockReturnValue('1234');
      expect(isAuthenticated()).toBeTruthy();
    });
    it('returns false if token is not in local storage', () => {
      (localStorage.getItem as any).mockReturnValue('');
      expect(isAuthenticated()).toBeFalsy();
    });
  });

  describe('fetchUser', () => {
    let dispatchMock: any;

    const mockDispatchAndGetUser = () => {
      dispatchMock = jest.fn();
      const loginMock = jest.spyOn(api, 'getUser');
      loginMock.mockImplementation(() => Promise.resolve({ data: { name: 'chris' } }));
      return fetchUser()(dispatchMock);
    };

    it('dispatches FETCH_USER action user with a username and password', async () => {
      await mockDispatchAndGetUser();
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(AuthActionTypes.FETCH_USER);
    });

    it('dispatch LOGIN_SUCCESS action', async () => {
      await mockDispatchAndGetUser();
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(AuthActionTypes.FETCH_USER_SUCCESS);
      expect(successDispatchCall.payload).toEqual({ name: 'chris' });
    });
  });
});