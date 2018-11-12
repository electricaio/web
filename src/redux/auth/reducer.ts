import { Reducer } from 'redux';
import { LoginState } from './types';
import { ActionType, getType } from 'typesafe-actions';

import * as loginActions from './actions';
export type LoginAction = ActionType<typeof loginActions>;

const initialState: LoginState = {
  errors: '',
  loading: false,
};

const reducer: Reducer<LoginState> = (state = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case getType(loginActions.loginUserAsyncActions.request): {
      return { ...state, loading: true, errors: '' };
    }
    case getType(loginActions.loginUserAsyncActions.success): {
      return { ...state, loading: false };
    }
    case getType(loginActions.loginUserAsyncActions.failure): {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as loginReducer };
