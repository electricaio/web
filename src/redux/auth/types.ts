export const enum LoginActionTypes {
  LOGIN_USER = '@@user/LOGIN_USER',
  LOGIN_USER_SUCCESS = '@@user/LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = '@@user/LOGIN_USER_ERROR',
}

export interface LoginState {
  readonly loading: boolean;
  readonly errors?: string;
}
