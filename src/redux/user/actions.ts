import { action } from 'typesafe-actions';
import { UserActionTypes, User } from './types';

export const loginUser = (username: string, password: string) =>
  action(UserActionTypes.LOGIN_USER, { username, password });

export const loginSuccess = (data: User[]) => action(UserActionTypes.LOGIN_USER_SUCCESS, data);
export const loginError = (message: string) => action(UserActionTypes.LOGIN_USER_ERROR, message);
