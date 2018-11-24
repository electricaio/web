import { Reducer } from 'redux';
import { ConnectionsState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { CONNECTION_DATA } from '../../fixtures/connections-data';

export type ConnectionsActionType = ActionType<typeof actions>;

const initialState: ConnectionsState = {
  data: CONNECTION_DATA,
  loading: false,
};

const reducer: Reducer<ConnectionsState> = (
  state = initialState,
  action: ConnectionsActionType
): ConnectionsState => {
  switch (action.type) {
    case getType(actions.connectionsAsyncActions.request): {
      return { ...state, loading: false };
    }
    case getType(actions.connectionsAsyncActions.success): {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
};

export { reducer as connectionsReducer };
