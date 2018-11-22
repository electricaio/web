import { Reducer } from 'redux';
import { ApiKeysState, ApiKeysTypes } from './types';

import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type ApiKeysActionTypes = ActionType<typeof actions>;

const initialState: ApiKeysState = {
  data: [],
  hiddenKey: null,
  loading: false,
};

const reducer: Reducer<ApiKeysState> = (
  state = initialState,
  action: ApiKeysActionTypes
): ApiKeysState => {
  switch (action.type) {
    case ApiKeysTypes.FETCH_ACCESS_KEYS: {
      return { ...state, loading: true };
    }
    case ApiKeysTypes.FETCH_ACCESS_KEYS_SUCCESS: {
      return { ...state, loading: true, data: action.payload };
    }
    case ApiKeysTypes.FETCH_ACCESS_KEY: {
      return { ...state, loading: true };
    }
    case ApiKeysTypes.FETCH_ACCESS_KEY_SUCCESS: {
      return { ...state, loading: true, hiddenKey: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as apiKeysReducer };
