import { Reducer } from 'redux';
import { ApiKeysState, ApiKeysTypes } from './types';
import { API_KEYS_TABLE_DATA } from '../../fixtures/api-keys-table-data';

import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type ApiKeysActionTypes = ActionType<typeof actions>;

const initialState: ApiKeysState = {
  data: API_KEYS_TABLE_DATA,
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
    default: {
      return state;
    }
  }
};

export { reducer as apiKeysReducer };
