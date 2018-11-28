import { SignupParamsType, UserDto, TokenState } from './types';
import { Api } from '../../modules/utils/api';

import get from 'lodash/get';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { AxiosResponse, AxiosError } from 'axios';
import { withAuth } from '../util';
import { signupUserAsyncActions, authAsyncActions, getUserAsyncActions } from './actions';

export const signupUser = (signupParams: SignupParamsType) => (dispatch: Dispatch) => {
  const api = new Api();

  dispatch(signupUserAsyncActions.request(signupParams));
  return api
    .createUser(signupParams)
    .then((result: AxiosResponse) => {
      dispatch(signupUserAsyncActions.success(result.data));
      dispatch(push('/login'));
    })
    .catch((error: AxiosError) => {
      dispatch(signupUserAsyncActions.failure(get(error, 'response.data.error_description')));
    });
};

export const loginUser = (username: string, password: string) => (dispatch: Dispatch) => {
  const api = new Api();
  dispatch(authAsyncActions.request());
  return api
    .login(username, password)
    .then((result: AxiosResponse<TokenState>) => {
      dispatch(authAsyncActions.success(result.data));
      dispatch(push('/api-keys'));
    })
    .catch((error: AxiosError) => {
      dispatch(authAsyncActions.failure(get(error, 'response.data.error_description')));
    });
};

export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch(
    authAsyncActions.success({
      access_token: undefined,
      refresh_token: undefined,
      expires_in: undefined,
    })
  );
  dispatch(push('/login'));
};

export const fetchUser = () =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(getUserAsyncActions.request());
    return api.getUser().then((result: AxiosResponse<UserDto>) => {
      dispatch(getUserAsyncActions.success(result.data));
    });
  });
