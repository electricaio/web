export type ConnectionModal = {
  accessKeyId: number;
  connectorId: number;
  id?: number;
  token?: string;
  name: string;
};

export const enum ConnectionTypes {
  FETCH_CONNECTIONS = '@@hub/FETCH_CONNECTIONS',
  FETCH_CONNECTIONS_SUCCESS = '@@hub/FETCH_CONNECTIONS_SUCCESS',
  FETCH_CONNECTIONS_ERROR = '@@hub/FETCH_CONNECTIONS_ERROR',
}

export interface ConnectionsState {
  readonly loading?: boolean;
  readonly data: ConnectionModal[];
}
