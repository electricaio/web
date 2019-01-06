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

export interface BaseAuthorizationType {
  id: number;
}
export interface AuthorizationBasicType {
  username: string;
  password: string;
}

export interface AuthorizationTokenType {
  token: string;
}

export type AuthorizationType = BaseAuthorizationType &
  AuthorizationTokenType &
  AuthorizationBasicType;

export const enum ConnectionTypes {
  FETCH_CONNECTIONS_SUCCESS = '@@hub/FETCH_CONNECTIONS_SUCCESS',
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
