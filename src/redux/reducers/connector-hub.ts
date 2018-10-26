import { TConnectorEntity } from '../../models/ConnectorEntity';
import { Reducer } from 'redux';

import { CONNECTOR_HUB_DATA } from '../../fixtures/connector-hub-data';
import { FETCH_KEY, TConnectorTypeAction } from '../actions/connector-hub';

export const connectorsReducer: Reducer<TConnectorEntity[], TConnectorTypeAction> = (
  state = CONNECTOR_HUB_DATA,
  action
) => {
  switch (action.type) {
    case FETCH_KEY:
      return state;

    default:
      return state;
  }
};
