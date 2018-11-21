import { Reducer } from 'redux';
import { ApiKeysState, ApiKeysTypes } from './types';

import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type ApiKeysActionTypes = ActionType<typeof actions>;

const initialState: ApiKeysState = {
  data: [],
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
    case ApiKeysTypes.REMOVE_ACCESS_KEY: {
      return { ...state, loading: true };
    }
    case ApiKeysTypes.REMOVE_ACCESS_KEY_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: state.data.filter(item => item.id !== action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as apiKeysReducer };
