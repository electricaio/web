import { createAsyncAction } from 'typesafe-actions';

import { AuthActionTypes, LoginParamsType, SignupParamsType, UserDto } from './types';
import {
  login,
  createUser,
  AUTH_TOKENS_STORAGE_KEY,
  AUTH_TOKEN_TYPE,
  getUser,
} from '../../modules/utils/api';

import get from 'lodash/get';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { AxiosResponse } from 'axios';

export const loginUserAsyncActions = createAsyncAction(
  AuthActionTypes.LOGIN_USER,
  AuthActionTypes.LOGIN_USER_SUCCESS,
  AuthActionTypes.LOGIN_USER_ERROR
)<LoginParamsType, AUTH_TOKEN_TYPE, string>();

export const signupUserAsyncActions = createAsyncAction(
  AuthActionTypes.SIGNUP_USER,
  AuthActionTypes.SIGNUP_USER_SUCCESS,
  AuthActionTypes.SIGNUP_USER_ERROR
)<SignupParamsType, AUTH_TOKEN_TYPE, string>();

export const getUserAsyncActions = createAsyncAction(
  AuthActionTypes.FETCH_USER,
  AuthActionTypes.FETCH_USER_SUCCESS,
  AuthActionTypes.FETCH_USER_ERROR
)<void, UserDto, string>();

export const signupUser = (signupParams: SignupParamsType) => (dispatch: Dispatch) => {
  dispatch(signupUserAsyncActions.request(signupParams));
  return createUser(signupParams)
    .then((result: AxiosResponse<AUTH_TOKEN_TYPE>) => {
      dispatch(signupUserAsyncActions.success(result.data));
      dispatch(push('/login'));
    })
    .catch(error => {
      dispatch(signupUserAsyncActions.failure(get(error, 'response.data.error_description')));
    });
};

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

export const fetchUser = () => (dispatch: Dispatch) => {
  dispatch(getUserAsyncActions.request());
  return getUser().then((result: AxiosResponse<UserDto>) => {
    dispatch(getUserAsyncActions.success(result.data));
  });
};
