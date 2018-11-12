export type ConnectorModal = {
  id: string;
  name: string;
  ern: string;
  description: string;
  image: string;
  type: string;
  keys: string[];
};

export const enum ConnectorHubTypes {
  FETCH_CONNECTORS = '@@hub/FETCH_CONNECTORS',
  FETCH_CONNECTORS_SUCCESS = '@@hub/FETCH_CONNECTORS_SUCCESS',
  FETCH_CONNECTORS_ERROR = '@@hub/FETCH_CONNECTORS_ERROR',
}

export interface ConnectorHubState {
  readonly loading?: boolean;
  readonly data: ConnectorModal[];
}
