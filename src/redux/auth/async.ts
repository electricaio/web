import { SignupParamsType, UserDto, TokenState } from './types';
import { Api } from '../../modules/utils/api';

import get from 'lodash/get';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { AxiosResponse, AxiosError } from 'axios';
import { withAuth } from '../util';
import { signupUserAsyncActions, authAsyncActions, getUserAsyncActions } from './actions';

export const signupUser = (signupParams: SignupParamsType) => async (dispatch: Dispatch) => {
  const api = new Api();

  dispatch(signupUserAsyncActions.request(signupParams));
  try {
    const result: AxiosResponse = await api.createUser(signupParams);
    dispatch(signupUserAsyncActions.success(result.data));
    dispatch(push('/login'));
  } catch (error) {
    dispatch(
      signupUserAsyncActions.failure(get(<AxiosError>error, 'response.data.error_description'))
    );
  }
};

export const loginUser = (username: string, password: string) => async (dispatch: Dispatch) => {
  const api = new Api();
  dispatch(authAsyncActions.request());
  try {
    const result: AxiosResponse<TokenState> = await api.login(username, password);
    dispatch(authAsyncActions.success(result.data));
    dispatch(push('/'));
  } catch (error) {
    dispatch(authAsyncActions.failure(get(error, 'response.data.error_description')));
  }
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

export const fetchUser = () => (dispatch: Dispatch) => {
  dispatch(getUserAsyncActions.request());

  return dispatch(
    withAuth((api: Api) => {
      return api.getUser().then((result: AxiosResponse<UserDto>) => {
        dispatch(getUserAsyncActions.success(result.data));
      });
    })
  );
};
