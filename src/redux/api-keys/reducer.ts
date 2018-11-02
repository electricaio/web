import { Reducer } from 'redux';
import { ApiKeysState, ApiKeysTypes } from './types';
import { API_KEYS_TABLE_DATA } from '../../fixtures/api-keys-table-data';

const initialState: ApiKeysState = {
  data: API_KEYS_TABLE_DATA,
  loading: false,
};

const reducer: Reducer<ApiKeysState> = (state = initialState, action) => {
  switch (action.type) {
    case ApiKeysTypes.FETCH_ACCESS_KEYS: {
      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
};

export { reducer as apiKeysReducer };
