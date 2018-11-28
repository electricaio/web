import { Dispatch } from 'redux';
import { AuthActionTypes } from './auth/types';
import { Api } from '../modules/utils/api';

export const withAuth = (requestAction: (api: Api, dispatch?: Dispatch) => Promise<void>) => ({
  type: AuthActionTypes.TOKEN_REQUEST,
  request: requestAction,
});
