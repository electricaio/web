import { action } from 'typesafe-actions';
import get from 'lodash/get';
import { LoginActionTypes } from './types';
import { login } from '../../modules/utils/api';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

const AUTH_TOKENS_STORAGE_KEY = 'auth.tokens';

type LoginSuccessResult = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export const loginUser = (username: string, password: string) => (dispatch: Dispatch) => {
  dispatch(action(LoginActionTypes.LOGIN_USER, { username, password }));
  login(username, password)
    .then((result: AxiosResponse<LoginSuccessResult>) => {
      localStorage.setItem(AUTH_TOKENS_STORAGE_KEY, JSON.stringify(result.data));
      dispatch(action(LoginActionTypes.LOGIN_USER_SUCCESS));
    })
    .catch(error => {
      dispatch(
        action(LoginActionTypes.LOGIN_USER_ERROR, get(error, 'response.data.error_description'))
      );
    });
};

export const logoutUser = () => {
  localStorage.removeItem(AUTH_TOKENS_STORAGE_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_TOKENS_STORAGE_KEY);
};
