import { Reducer } from 'redux';
import { AccessKeysState } from './types';

import * as actions from './actions';
import { ActionType, getType } from 'typesafe-actions';

export type AccessKeysActionTypes = ActionType<typeof actions>;

const initialState: AccessKeysState = {
  data: [],
};

const reducer: Reducer<AccessKeysState> = (
  state = initialState,
  action: AccessKeysActionTypes
): AccessKeysState => {
  switch (action.type) {
    case getType(actions.fetchAccessKeysAsyncActions.success): {
      return { ...state, data: action.payload };
    }
    case getType(actions.fetchApiKeyAsyncActions.success): {
      const stateWithAccessKey = state.data.map(
        el => (el.id === action.payload.id ? action.payload : el)
      );
      return { ...state, data: stateWithAccessKey };
    }
    case getType(actions.removeKeysAsyncActions.success): {
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload.id),
      };
    }
    case getType(actions.createAccessKeysAsyncActions.success): {
      return {
        ...state,
        data: state.data.concat(action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as accessKeysReducer };
