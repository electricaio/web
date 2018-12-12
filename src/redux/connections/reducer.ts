import { Reducer } from 'redux';
import { ConnectionsState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type ConnectionsActionType = ActionType<typeof actions>;

const initialState: ConnectionsState = {
  data: [],
};

const reducer: Reducer<ConnectionsState> = (
  state = initialState,
  action: ConnectionsActionType
): ConnectionsState => {
  switch (action.type) {
    case getType(actions.createConnectionAsyncActions.success): {
      return { ...state, data: state.data.concat(action.payload) };
    }
    case getType(actions.fetchConnectionsAsyncActions.success): {
      return { ...state, data: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as connectionsReducer };
