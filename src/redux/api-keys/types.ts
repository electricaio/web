export type ApiKeyModal = {
  id?: number;
  userId?: number;
  name: string;
  key?: string;
  createdAt?: string;
};

export const enum ApiKeysTypes {
  FETCH_ACCESS_KEYS = '@@keys/FETCH_ACCESS_KEYS',
  FETCH_ACCESS_KEY = '@@keys/FETCH_ACCESS_KEY',
  CREATE_ACCESS_KEY = '@@keys/CREATE_ACCESS_KEY',
  REMOVE_ACCESS_KEY = '@@keys/REMOVE_ACCESS_KEY',
  REFRESH_KEY = '@@keys/REFRESH_KEY',
  // success states
  FETCH_ACCESS_KEYS_SUCCESS = '@@keys/FETCH_ACCESS_KEYS_SUCCESS',
  FETCH_ACCESS_KEY_SUCCESS = '@@keys/FETCH_ACCESS_KEY_SUCCESS',
  CREATE_ACCESS_KEY_SUCCESS = '@@keys/CREATE_ACCESS_KEY_SUCCESS',
  REMOVE_ACCESS_KEY_SUCCESS = '@@keys/REMOVE_ACCESS_KEY_SUCCESS',
  REFRESH_KEY_SUCCESS = '@@keys/REFRESH_KEY_SUCCESS',
  // error states
  FETCH_ACCESS_KEYS_ERROR = '@@keys/FETCH_ACCESS_KEYS_ERROR',
  FETCH_ACCESS_KEY_ERROR = '@@keys/FETCH_ACCESS_KEY_ERROR',
  CREATE_ACCESS_KEY_ERROR = '@@keys/CREATE_ACCESS_KEY_ERROR',
  REMOVE_ACCESS_KEY_ERROR = '@@keys/REMOVE_ACCESS_KEY_ERROR',
  REFRESH_KEY_ERROR = '@@keys/REFRESH_KEY_ERROR',
}

export interface ApiKeysState {
  readonly loading?: boolean;
  readonly data: ApiKeyModal[];
}
