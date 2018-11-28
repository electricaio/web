import { applyMiddleware, createStore, Dispatch, Store, Action } from 'redux';
import thunk from 'redux-thunk';
import { withAuth } from '../../util';
import { Api } from '../../../modules/utils/api';
import { rootReducer, ApplicationState } from '../../store';
import requestMiddleware, { refreshTokenPromise } from '../requestMiddleware';
import { AuthActionTypes, TokenState } from '../../auth/types';
import { CALL_HISTORY_METHOD } from 'connected-react-router';

jest.mock('../../../modules/utils/api');

type storeMockType = {
  initialState: ApplicationState;
  actions: Action[];
};
type ActionsType = {
  actions: Action[];
};

const createLoggingMiddleware = ({ actions }: ActionsType) => (store: Store) => (
  next: Dispatch
) => (action: Action) => {
  actions.push(action);
  return next(action);
};

const createStoreMock = ({ initialState, actions }: storeMockType): Store => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      requestMiddleware(),
      createLoggingMiddleware({
        actions,
      })
    )
  );
};

const TEST_RESULT = 'TEST_RESULT';
const TEST_RESULT_FAILED = 'TEST_RESULT_FAILED';

export const fetchLoggedInUser = () =>
  withAuth((api: Api, dispatch: Dispatch) => {
    dispatch({
      type: TEST_RESULT,
    });
    return Promise.resolve();
  });
export const fetchLoggedOutUser = () =>
  withAuth((api: Api, dispatch: Dispatch) => {
    dispatch({
      type: TEST_RESULT_FAILED,
    });
    const error = { response: { status: 401 } };
    return Promise.reject(error);
  });

describe('Request API middlware', () => {
  it('should convert an API action properly', () => {
    const action = fetchLoggedInUser();
    expect(action.type).toEqual(AuthActionTypes.TOKEN_REQUEST);
    expect(action.request).toBeDefined();
  });

  const goodStore = ({ actions }: ActionsType) => {
    return createStoreMock({
      actions,
      initialState: {
        apiKeys: { data: [] },
        connectors: { data: [] },
        connections: { data: [] },
        auth: {
          loading: false,
          tokens: {
            access_token: '200',
            refresh_token: '0',
            expires_in: 0,
          },
        },
      },
    });
  };
  it('should convert an API action properly', () => {
    const actions: Action[] = [];

    goodStore({ actions }).dispatch(fetchLoggedInUser());
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: TEST_RESULT,
        }),
      ])
    );
  });
  it('passes tokens to api class', () => {
    const actions: Action[] = [];
    goodStore({ actions }).dispatch(fetchLoggedInUser());
    expect(Api).toBeCalledWith({
      access_token: '200',
      refresh_token: '0',
      expires_in: 0,
    });
  });

  describe('request gets 401', () => {
    const tokens: TokenState = {
      access_token: 'new token',
      refresh_token: 'new refresh key',
      expires_in: 0,
    };
    let mockDispatch: jest.Mock;
    let mockRequest: jest.Mock;
    let refreshTokenMock: jest.Mock;
    beforeEach(() => {
      refreshTokenMock = jest.fn(() => Promise.resolve(tokens));
      (Api as any).mockImplementation(() => {
        return {
          refreshToken: refreshTokenMock,
        };
      });
      mockDispatch = jest.fn();
      const error = {
        response: {
          status: 401,
        },
      };
      mockRequest = jest.fn(() => Promise.reject(error));
    });

    it('request fails with 401 so call refreshToken', async () => {
      await refreshTokenPromise(mockRequest, mockDispatch, tokens);
      expect(refreshTokenMock).toBeCalled();
      expect(refreshTokenMock).toBeCalledWith(tokens.refresh_token);
    });

    it('request fails with 401 so dispatch auth success', async () => {
      await refreshTokenPromise(mockRequest, mockDispatch, tokens);
      expect(mockDispatch.mock.calls[0][0].type).toEqual(AuthActionTypes.TOKEN_RECEIVED);
    });
  });

  it('request fails again after getting new token so redirect back to login', async () => {
    const newToken: TokenState = {
      access_token: 'new token',
      refresh_token: 'new refresh key',
      expires_in: 0,
    };
    const refreshTokenMock = jest.fn(() => Promise.resolve(newToken));
    (Api as any).mockImplementation(() => {
      return {
        refreshToken: refreshTokenMock,
      };
    });
    const mockDispatch = jest.fn();
    const error = {
      response: {
        status: 401,
      },
    };
    const mockRequest = jest.fn(() => Promise.reject(error));
    await refreshTokenPromise(mockRequest, mockDispatch, newToken);
    expect(mockDispatch.mock.calls[1][0].type).toEqual(CALL_HISTORY_METHOD);
    expect(mockDispatch.mock.calls[2][0].type).toEqual(AuthActionTypes.TOKEN_FAILURE);
  });
  it('request fails with a 500 so just reject the call', async () => {
    const newToken: TokenState = {
      access_token: 'new token',
      refresh_token: 'new refresh key',
      expires_in: 0,
    };

    const mockDispatch = jest.fn();
    const error = {
      response: {
        status: 500,
      },
    };
    const mockRequest = jest.fn(() => Promise.reject(error));
    try {
      await refreshTokenPromise(mockRequest, mockDispatch, newToken);
    } catch (err) {
      expect(err).toEqual(error);
    }
  });

  it('rejects the promise and fails the auth actions if an unknown error occirs', async () => {
    const tokens: TokenState = {
      access_token: 'new token',
      refresh_token: 'new refresh key',
      expires_in: 0,
    };

    const mockDispatch = jest.fn();

    const mockRequest = jest.fn(() => Promise.reject({}));
    try {
      refreshTokenPromise(mockRequest, mockDispatch, tokens);
    } catch (err) {
      expect(mockDispatch.mock.calls[0][0].type).toEqual(AuthActionTypes.TOKEN_FAILURE);
    }
  });
});
