import { ActionType, getType } from 'typesafe-actions';

import * as errorActions from './actions';
import { ErrorsState } from './types';
import { Reducer } from 'redux';
export type ErrorActionsType = ActionType<typeof errorActions>;

const initialState: ErrorsState = {
  message: '',
};

const reducer: Reducer<ErrorsState> = (
  state = initialState,
  action: ErrorActionsType
): ErrorsState => {
  switch (action.type) {
    case getType(errorActions.createError):
      return { ...state, message: action.payload };
    case getType(errorActions.resetError):
      return { ...state, message: '' };
    default:
      return state;
  }
};

export { reducer as errorReducer };
