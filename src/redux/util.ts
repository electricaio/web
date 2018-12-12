import { Dispatch } from 'redux';
import { AuthActionTypes } from './auth/types';
import { Api } from '../modules/utils/api';

export const withAuth = (
  dispatch: Dispatch,
  requestAction: (api: Api, dispatch?: Dispatch) => any
) => {
  return new Promise((resolve, reject) => {
    return dispatch({
      type: AuthActionTypes.TOKEN_REQUEST,
      // @ts-ignore
      request: (...args) => {
        // @ts-ignore
        return requestAction(...args)
          .then(resolve)
          .catch((error: any) => {
            reject(error);
            // throw to any other promise that is listening
            throw error;
          });
      },
    });
  });
};
