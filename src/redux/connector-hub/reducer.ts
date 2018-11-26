import { Reducer } from 'redux';
import { ConnectorHubState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { CONNECTOR_HUB_DATA } from '../../fixtures/connector-hub-data';

export type ConnectorHubActionType = ActionType<typeof actions>;

const initialState: ConnectorHubState = {
  data: CONNECTOR_HUB_DATA,
  loading: false,
};

const reducer: Reducer<ConnectorHubState> = (
  state = initialState,
  action: ConnectorHubActionType
): ConnectorHubState => {
  switch (action.type) {
    case getType(actions.connectorHubAsyncActions.request): {
      return { ...state, loading: true };
    }
    case getType(actions.connectorHubAsyncActions.success): {
      return { ...state, loading: false, data: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as connectorHubReducer };
