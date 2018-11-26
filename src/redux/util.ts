import { Dispatch } from 'redux';
import { AuthActionTypes } from './auth/types';
import { Api } from '../modules/utils/api';

export const withAuth = (requestAction: (dispatch: Dispatch, api: Api) => Promise<void>) => ({
  type: AuthActionTypes.TOKEN_REQUEST,
  request: requestAction,
});
