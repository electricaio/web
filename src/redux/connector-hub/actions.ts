import { action } from 'typesafe-actions';
import { ConnectorHubTypes } from './types';

export const fetchConnectors = () => action(ConnectorHubTypes.FETCH_CONNECTORS);
