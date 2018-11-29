import { createAsyncAction } from 'typesafe-actions';

import { AuthActionTypes, SignupParamsType, UserDto, TokenState } from './types';

export const authAsyncActions = createAsyncAction(
  AuthActionTypes.TOKEN_REQUEST,
  AuthActionTypes.TOKEN_RECEIVED,
  AuthActionTypes.TOKEN_FAILURE
)<void, TokenState, string>();

export const signupUserAsyncActions = createAsyncAction(
  AuthActionTypes.SIGNUP_USER,
  AuthActionTypes.SIGNUP_USER_SUCCESS,
  AuthActionTypes.SIGNUP_USER_ERROR
)<SignupParamsType, TokenState, string>();

export const getUserAsyncActions = createAsyncAction(
  AuthActionTypes.FETCH_USER,
  AuthActionTypes.FETCH_USER_SUCCESS,
  AuthActionTypes.FETCH_USER_ERROR
)<void, UserDto, string>();
