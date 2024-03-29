import { Reducer } from 'redux';
import { ConnectorHubState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type ConnectorHubActionType = ActionType<typeof actions>;

const initialState: ConnectorHubState = {
  data: [],
};

const reducer: Reducer<ConnectorHubState> = (
  state = initialState,
  action: ConnectorHubActionType
): ConnectorHubState => {
  switch (action.type) {
    case getType(actions.connectorHubAsyncActions.success): {
      return { ...state, data: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as connectorHubReducer };
