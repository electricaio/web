import { MiddlewareAPI, Dispatch, Action } from 'redux';
import { ApplicationState } from '../store';
import { TokenState } from '../auth/types';
import { Api } from '../../modules/utils/api';
import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';
import { authAsyncActions } from '../auth/actions';
import { push } from 'connected-react-router';
import { createError } from '../error/actions';

interface RequestAction extends Action {
  request: (api: Api, dispatch: Dispatch) => AxiosPromise;
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
  request: (api: Api, dispatch: Dispatch) => AxiosPromise,
  dispatch: Dispatch,
  tokens: TokenState
) => {
  // Attempt to make the request
  return request(new Api(tokens), dispatch).catch((error: AxiosError) => {
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
          return request(new Api(result.data), dispatch);
        })
        .catch(() => {
          // if there is a failure getting an access token then we just redirect to the login page
          dispatch(push('/login'));
        });
    }
    // any other error just send back to the function that made the request and dispatch an error to the error reducer
    dispatch(createError(error.message));
    return Promise.reject(error);
  });
};
