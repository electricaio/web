export interface User {
  id?: number;
  name?: string;
}

export const enum UserActionTypes {
  LOGIN_USER = '@@user/LOGIN_USER',
  LOGIN_USER_SUCCESS = '@@user/LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = '@@user/LOGIN_USER_ERROR',
}

export interface UserState {
  readonly loading: boolean;
  readonly user: User;
  readonly errors?: string;
}
