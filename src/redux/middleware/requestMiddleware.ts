import { MiddlewareAPI, Dispatch, Action } from 'redux';
import { ApplicationState } from '../store';
import { TokenState } from '../auth/types';
import { Api } from '../../modules/utils/api';
import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import { authAsyncActions } from '../auth/actions';
import { push } from 'connected-react-router';

interface RequestAction extends Action {
  request: (dispatch: Dispatch, api: Api) => AxiosPromise;
}

export default function requestMiddleware() {
  return (props: MiddlewareAPI<Dispatch, ApplicationState>) => (next: Dispatch) => (
    action: RequestAction
  ) => {
    const { dispatch, getState } = props;
    const { request } = action;

    if (!request) {
      return next(action);
    }

    const { tokens } = getState().auth;

    refreshTokenPromise(request, dispatch, tokens);
  };
}

export const refreshTokenPromise = (
  request: (dispatch: Dispatch, api: Api) => AxiosPromise,
  dispatch: Dispatch,
  tokens: TokenState
) => {
  // Attempt to make the request
  return request(dispatch, new Api(tokens)).catch((error: AxiosError) => {
    if (error.response === undefined) {
      dispatch(
        authAsyncActions.failure('There is a problem with your connection. Please try again')
      );
      return Promise.reject(error);
    }
    // if a 401 is returns we need to use the refresh token to get a new access token
    if (error.response.status === 401) {
      return new Api()
        .refreshToken(tokens.refresh_token)
        .then((result: AxiosResponse<TokenState>) => {
          dispatch(authAsyncActions.success(result.data));
          return request(dispatch, new Api(result.data));
        })
        .catch(() => {
          // if there is a failure getting an access token then we just redirect to the login page
          dispatch(push('/login'));
          dispatch(authAsyncActions.failure('Could not establish a session. Please login again'));
        });
    }
    // any other error just send back to the function that made the request
    return Promise.reject(error);
  });
};
