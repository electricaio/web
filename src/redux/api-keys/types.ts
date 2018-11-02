export type ApiKeyModal = {
  id: string;
  name: string;
  key: string;
  created: Date;
};

export const enum ApiKeysTypes {
  FETCH_ACCESS_KEYS = '@@keys/FETCH_ACCESS_KEYS',
  CREATE_ACCESS_KEY = '@@keys/CREATE_ACCESS_KEY',
  REMOVE_ACCESS_KEY = '@@keys/REMOVE_ACCESS_KEY',
}

export interface ApiKeysState {
  readonly loading?: boolean;
  readonly data: ApiKeyModal[];
}
