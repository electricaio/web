import { Reducer } from 'redux';
import { AuthState } from './types';
import { ActionType, getType } from 'typesafe-actions';

import * as authActions from './actions';
export type AuthActions = ActionType<typeof authActions>;

const initialState: AuthState = {
  tokens: { access_token: null, refresh_token: null, expires_in: null, token_type: null },
  errors: '',
  loading: false,
  user: { email: null, firstName: null, id: null, lastName: null, organizationId: null },
};

const reducer: Reducer<AuthState> = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case getType(authActions.authAsyncActions.success): {
      return { ...state, loading: false, tokens: action.payload };
    }
    case getType(authActions.authAsyncActions.failure): {
      return { ...state, loading: false, errors: action.payload };
    }
    case getType(authActions.getUserAsyncActions.success): {
      return { ...state, loading: false, user: action.payload };
    }
    case getType(authActions.signupUserAsyncActions.request): {
      return { ...state, loading: true, errors: '' };
    }
    case getType(authActions.signupUserAsyncActions.success): {
      return { ...state, loading: false };
    }
    case getType(authActions.signupUserAsyncActions.failure): {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as authReducer };
