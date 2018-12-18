export type ConnectorModal = {
  typeId: number;
  authorizationType: string;
  name: string;
  resource: string;
  version: string;
  imageUrl?: string;
  namespace: string;
  properties: {
    url: string;
    sdk_url: string;
    image_url: string;
    description: string;
  };
  id: number;
  ern: string;
  revisionVersion: number;
};

export const enum ConnectorHubTypes {
  FETCH_CONNECTORS = '@@hub/FETCH_CONNECTORS',
  FETCH_CONNECTORS_SUCCESS = '@@hub/FETCH_CONNECTORS_SUCCESS',
  FETCH_CONNECTORS_ERROR = '@@hub/FETCH_CONNECTORS_ERROR',
}

export interface ConnectorHubState {
  readonly data: ConnectorModal[];
}
