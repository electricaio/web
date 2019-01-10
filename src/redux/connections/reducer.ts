import { Reducer } from 'redux';
import { ConnectionsState, ConnectionModal } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type ConnectionsActionType = ActionType<typeof actions>;

const initialState: ConnectionsState = {
  data: [],
  authorizations: [],
};

const reducer: Reducer<ConnectionsState> = (
  state = initialState,
  action: ConnectionsActionType
): ConnectionsState => {
  switch (action.type) {
    case getType(actions.createConnectionsSuccess): {
      return { ...state, data: state.data.concat(action.payload) };
    }
    case getType(actions.fetchConnectionsSuccess): {
      return { ...state, data: action.payload };
    }
    case getType(actions.fetchConnectionSuccess): {
      const connection = state.data.find((con: ConnectionModal) => con.id === action.payload.id);
      if (!connection) {
        return { ...state, data: state.data.concat(action.payload) };
      }
      const stateWithUpdatedConnection = state.data.map(
        el => (el.id === action.payload.id ? { ...el, ...action.payload } : el)
      );
      return { ...state, data: stateWithUpdatedConnection };
    }
    case getType(actions.updateConnectionSuccess): {
      const stateWithUpdatedConnection = state.data.map(
        el => (el.id === action.payload.id ? { ...el, ...action.payload } : el)
      );
      return { ...state, data: stateWithUpdatedConnection };
    }
    case getType(actions.deleteConnectionSuccess): {
      return {
        ...state,
        data: state.data.filter((connection: ConnectionModal) => connection.id !== action.payload),
      };
    }
    case getType(actions.fetchAuthorizationSuccess): {
      return {
        ...state,
        authorizations: state.authorizations.concat(action.payload),
      };
    }
    case getType(actions.updateAuthorizationSuccess): {
      const stateWithUpdatedAuth = state.authorizations.map(
        el => (el.id === action.payload.id ? { ...el, ...action.payload } : el)
      );
      return { ...state, authorizations: stateWithUpdatedAuth };
    }

    default: {
      return state;
    }
  }
};

export { reducer as connectionsReducer };
