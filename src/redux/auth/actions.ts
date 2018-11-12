import { createAsyncAction } from 'typesafe-actions';

import { LoginActionTypes, LoginParamsType } from './types';
import { login, AUTH_TOKENS_STORAGE_KEY, AUTH_TOKEN_TYPE } from '../../modules/utils/api';

import get from 'lodash/get';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { AxiosResponse } from 'axios';

export const loginUserAsyncActions = createAsyncAction(
  LoginActionTypes.LOGIN_USER,
  LoginActionTypes.LOGIN_USER_SUCCESS,
  LoginActionTypes.LOGIN_USER_ERROR
)<LoginParamsType, AUTH_TOKEN_TYPE, string>();

export const loginUser = (username: string, password: string) => (dispatch: Dispatch) => {
  dispatch(loginUserAsyncActions.request({ username, password }));
  return login(username, password)
    .then((result: AxiosResponse<AUTH_TOKEN_TYPE>) => {
      localStorage.setItem(AUTH_TOKENS_STORAGE_KEY, JSON.stringify(result.data));
      dispatch(loginUserAsyncActions.success(result.data));
      dispatch(push('/api-keys'));
    })
    .catch(error => {
      dispatch(loginUserAsyncActions.failure(get(error, 'response.data.error_description')));
    });
};

export const logoutUser = () => (dispatch: Dispatch) => {
  localStorage.removeItem(AUTH_TOKENS_STORAGE_KEY);
  dispatch(push('/login'));
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKENS_STORAGE_KEY);
};
