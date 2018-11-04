import { Reducer } from 'redux';
import { UserState, UserActionTypes } from './types';

const initialState: UserState = {
  user: {},
  errors: undefined,
  loading: false,
};

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER: {
      return { ...state, loading: true };
    }
    case UserActionTypes.LOGIN_USER_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case UserActionTypes.LOGIN_USER_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
