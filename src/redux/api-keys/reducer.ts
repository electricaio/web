import { Reducer } from 'redux';
import { ApiKeysState } from './types';

import * as actions from './actions';
import { ActionType, getType } from 'typesafe-actions';

export type ApiKeysActionTypes = ActionType<typeof actions>;

const initialState: ApiKeysState = {
  data: [],
};

const reducer: Reducer<ApiKeysState> = (
  state = initialState,
  action: ApiKeysActionTypes
): ApiKeysState => {
  switch (action.type) {
    case getType(actions.fetchApiKeysAsyncActions.success): {
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
    case getType(actions.createApiKeysAsyncActions.success): {
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

export { reducer as apiKeysReducer };
