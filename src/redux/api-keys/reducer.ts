import { Reducer } from 'redux';
import _ from 'lodash';
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
      const accessKeys = _.cloneDeep(action.payload);
      accessKeys.map((obj) => {
        obj.key = obj.name;
        return obj;
      });
      return { ...state, loading: true, data: accessKeys };
    }
    default: {
      return state;
    }
  }
};

export { reducer as apiKeysReducer };
