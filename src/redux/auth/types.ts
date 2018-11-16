export type LoginParamsType = {
  username: string;
  password: string;
};

export type UserDto = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  organizationId: number;
};

export const enum AuthActionTypes {
  LOGIN_USER = '@@user/LOGIN_USER',
  LOGIN_USER_SUCCESS = '@@user/LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = '@@user/LOGIN_USER_ERROR',

  FETCH_USER = '@@user/FETCH_USER',
  FETCH_USER_SUCCESS = '@@user/FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = '@@user/FETCH_USER_ERROR',
}

export interface LoginState {
  readonly loading: boolean;
  readonly errors?: string;
  readonly user?: UserDto;
}
