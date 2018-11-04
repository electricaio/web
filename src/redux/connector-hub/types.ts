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
}

export interface ConnectorHubState {
  readonly loading?: boolean;
  readonly data: ConnectorModal[];
}
