export type ConnectionModal = {
  accessKeyId: number;
  connectorId: number;
  authorizationId?: number;
  createdAt?: string;
  id?: number;
  name: string;
};

export interface AuthorizationBasicType {
  username: string;
  password: string;
}

export interface AuthorizationTokenType {
  token: string;
}

export type AuthorizationType = AuthorizationTokenType | AuthorizationBasicType;

export const enum ConnectionTypes {
  FETCH_CONNECTIONS = '@@hub/FETCH_CONNECTIONS',
  FETCH_CONNECTIONS_SUCCESS = '@@hub/FETCH_CONNECTIONS_SUCCESS',
  FETCH_CONNECTIONS_ERROR = '@@hub/FETCH_CONNECTIONS_ERROR',

  CREATE_CONNECTION = '@@hub/CREATE_CONNECTION',
  CREATE_CONNECTION_SUCCESS = '@@hub/CREATE_CONNECTION_SUCCESS',
  CREATE_CONNECTION_ERROR = '@@hub/CREATE_CONNECTION_ERROR',
}

export interface ConnectionsState {
  readonly loading?: boolean;
  readonly data: ConnectionModal[];
}
