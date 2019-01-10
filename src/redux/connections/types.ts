export type ConnectionModal = {
  accessKeyId: number;
  connectorId: number;
  properties?: { [s: string]: string };
  authorizationId?: number;
  createdAt?: string;
  revisionVersion?: number;
  id?: number;
  name: string;
};

export type AuthorizationBasicType = {
  id: number;
  username: string;
  password: string;
};

export type AuthorizationTokenType = {
  id: number;
  token: string;
};

export type AuthorizationType = AuthorizationBasicType & AuthorizationTokenType;

export const enum ConnectionTypes {
  FETCH_CONNECTIONS_SUCCESS = '@@hub/FETCH_CONNECTIONS_SUCCESS',
  FETCH_CONNECTION_SUCCESS = '@@hub/FETCH_CONNECTION_SUCCESS',
  CREATE_CONNECTION_SUCCESS = '@@hub/CREATE_CONNECTION_SUCCESS',
  UPDATE_CONNECTION_SUCCESS = '@@hub/UPDATE_CONNECTION_SUCCESS',
  DELETE_CONNECTION_SUCCESS = '@@hub/DELETE_CONNECTION_SUCCESS',
  FETCH_AUTHORIZATION_SUCCESS = '@@hub/FETCH_AUTHORIZATION_SUCCESS',
  UPDATE_AUTHORIZATION = '@@hub/AUTHORIZATION_SUCCESS',
}

export interface ConnectionsState {
  readonly data: ConnectionModal[];
  readonly authorizations: AuthorizationType[];
}
