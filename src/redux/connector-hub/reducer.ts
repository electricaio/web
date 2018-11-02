import { Reducer } from 'redux';
import { ConnectorHubState, ConnectorHubTypes } from './types';
import { CONNECTOR_HUB_DATA } from '../../fixtures/connector-hub-data';

const initialState: ConnectorHubState = {
  data: CONNECTOR_HUB_DATA,
  loading: false,
};

const reducer: Reducer<ConnectorHubState> = (state = initialState, action) => {
  switch (action.type) {
    case ConnectorHubTypes.FETCH_CONNECTORS: {
      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
};

export { reducer as connectorHubReducer };
