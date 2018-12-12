import { loginUser, signupUser, logoutUser, fetchUser } from '../async';

import { Api } from '../../../modules/utils/api';
import { AuthActionTypes, SignupParamsType } from '../types';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import { withAuth } from '../../util';

jest.mock('../../../modules/utils/api');
jest.mock('../../util');

describe('Auth', () => {
  describe('loginUser', () => {
    let dispatchMock: jest.Mock = null;
    const username = 'some user';
    const password = 'password';

    const mockDispatchAndLoginUser = (apiResponse: () => void) => {
      dispatchMock = jest.fn();
      (Api as any).mockImplementation(() => {
        return {
          login: apiResponse,
        };
      });
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

        expect(firstDispatchCall.type).toEqual(AuthActionTypes.TOKEN_REQUEST);
      });

      it('dispatch LOGIN_SUCCESS action', async () => {
        await successfulApiResponse();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(AuthActionTypes.TOKEN_RECEIVED);
      });

      it('routes to the home page  ', async () => {
        await successfulApiResponse();
        const routerDispatchCall = dispatchMock.mock.calls[2][0];
        expect(routerDispatchCall.payload).toEqual({ method: 'push', args: ['/'] });
      });
    });

    describe('on api error', () => {
      it('dispatches TOKEN_FAILURE action', async () => {
        await errorApiResponse();
        const errorDispatchCall = dispatchMock.mock.calls[1][0];
        expect(errorDispatchCall.type).toEqual(AuthActionTypes.TOKEN_FAILURE);
      });
    });
  });

  describe('signupUser', () => {
    let dispatchMock: jest.Mock = null;
    const params: SignupParamsType = {
      email: 'test@test.com',
      firstName: 'First',
      lastName: 'Last',
      organizationId: 1,
      password: 'password',
    };

    const mockDispatchAndSignupUser = (apiResponse: () => void) => {
      dispatchMock = jest.fn();
      (Api as any).mockImplementation(() => {
        return {
          createUser: apiResponse,
        };
      });
      return signupUser(params)(dispatchMock);
    };

    const successfulApiResponse = () => {
      return mockDispatchAndSignupUser(() => Promise.resolve({ data: { email: 'test@test.com' } }));
    };

    const errorApiResponse = () => {
      return mockDispatchAndSignupUser(() => Promise.reject({ error: 'error' }));
    };

    describe('on api success', () => {
      it('dispatches SIGNUP_USER action user with parameters', async () => {
        await successfulApiResponse();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(AuthActionTypes.SIGNUP_USER);
        expect(firstDispatchCall.payload).toEqual(params);
      });

      it('dispatch SIGNUP_USER_SUCCESS action', async () => {
        await successfulApiResponse();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(AuthActionTypes.SIGNUP_USER_SUCCESS);
      });

      it('routes to the login page  ', async () => {
        await successfulApiResponse();
        const routerDispatchCall = dispatchMock.mock.calls[2][0];
        expect(routerDispatchCall.payload).toEqual({ method: 'push', args: ['/login'] });
      });
    });

    describe('on api error', () => {
      it('dispatches SIGNUP_USER_ERROR action', async () => {
        await errorApiResponse();
        const errorDispatchCall = dispatchMock.mock.calls[1][0];
        expect(errorDispatchCall.type).toEqual(AuthActionTypes.SIGNUP_USER_ERROR);
      });
    });
  });

  describe('logoutUser', () => {
    it('routes to login page', () => {
      const dispatchMock = jest.fn();
      logoutUser()(dispatchMock);
      expect(dispatchMock).toBeCalled();
      const routeToLoginDispatch = dispatchMock.mock.calls[1][0];
      expect(routeToLoginDispatch.type).toEqual(CALL_HISTORY_METHOD);
      expect(routeToLoginDispatch.payload).toEqual({ method: 'push', args: ['/login'] });
    });

    it('calls TOKEN_RECEIVED with undefined token value', () => {
      const dispatchMock = jest.fn();
      logoutUser()(dispatchMock);
      const tokenReceivedDispatch = dispatchMock.mock.calls[0][0];
      expect(tokenReceivedDispatch.type).toEqual(AuthActionTypes.TOKEN_RECEIVED);
      expect(tokenReceivedDispatch.payload).toEqual({
        access_token: undefined,
        expires_in: undefined,
        refresh_token: undefined,
      });
    });
  });

  describe('fetchUser', () => {
    let dispatchMock: jest.Mock;
    let mockApi: any;
    beforeEach(() => {
      mockApi = {
        getUser: () => Promise.resolve({ data: { name: 'chris' } }),
      };
      dispatchMock = jest.fn();
      (withAuth as jest.Mock).mockImplementation((_, request: any) => {
        request(mockApi);
      });
    });

    it('dispatches FETCH_USER action user with a username and password', async () => {
      await fetchUser()(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(AuthActionTypes.FETCH_USER);
    });

    it('dispatch FETCH_USER_SUCCESS action', async () => {
      await fetchUser()(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(AuthActionTypes.FETCH_USER_SUCCESS);
      expect(successDispatchCall.payload).toEqual({ name: 'chris' });
    });
  });
});
