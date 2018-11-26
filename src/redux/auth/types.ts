export type LoginParamsType = {
  username: string;
  password: string;
};

export type SignupParamsType = {
  email: string;
  firstName: string;
  lastName: string;
  organizationId: number;
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

  SIGNUP_USER = '@@user/SIGNUP_USER',
  SIGNUP_USER_SUCCESS = '@@user/SIGNUP_USER_SUCCESS',
  SIGNUP_USER_ERROR = '@@user/SIGNUP_USER_ERROR',

  TOKEN_REQUEST = '@@token/TOKEN_REQUEST',
  TOKEN_RECEIVED = '@@token/TOKEN_RECEIVED',
  TOKEN_FAILURE = '@@token/TOKEN_FAILURE',
}

export interface TokenState {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly token_type?: string;
  readonly expires_in: number;
}

export interface AuthState {
  readonly tokens: TokenState;
  readonly loading: boolean;
  readonly errors?: string;
  readonly user?: UserDto;
}

export interface SignupState {
  readonly loading: boolean;
  readonly errors?: string;
}
