import { Reducer } from 'redux';
import { LoginState, LoginActionTypes } from './types';

const initialState: LoginState = {
  errors: undefined,
  loading: false,
};

const reducer: Reducer<LoginState> = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN_USER: {
      return { ...state, loading: true };
    }
    case LoginActionTypes.LOGIN_USER_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case LoginActionTypes.LOGIN_USER_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as loginReducer };
