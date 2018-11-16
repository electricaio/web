import { Reducer } from 'redux';
import { LoginState } from './types';
import { ActionType, getType } from 'typesafe-actions';

import * as authActions from './actions';
export type AuthActions = ActionType<typeof authActions>;

const initialState: LoginState = {
  errors: '',
  loading: false,
};

const reducer: Reducer<LoginState> = (state = initialState, action: AuthActions): LoginState => {
  switch (action.type) {
    case getType(authActions.loginUserAsyncActions.request): {
      return { ...state, loading: true, errors: '' };
    }
    case getType(authActions.loginUserAsyncActions.success): {
      return { ...state, loading: false };
    }
    case getType(authActions.loginUserAsyncActions.failure): {
      return { ...state, loading: false, errors: action.payload };
    }
    case getType(authActions.getUserAsyncActions.success): {
      return { ...state, loading: false, user: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as authReducer };
