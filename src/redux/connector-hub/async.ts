import { ConnectorModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import { connectorHubAsyncActions } from './actions';

export const fetchConnectors = () => (dispatch: Dispatch) => {
  dispatch(connectorHubAsyncActions.request());
  dispatch(
    withAuth((api: Api, dispatch: Dispatch) => {
      return api.getConnectors().then((result: AxiosResponse<ConnectorModal[]>) => {
        dispatch(connectorHubAsyncActions.success(result.data));
      });
    })
  );
};

// export const fetchConnector = (connectorId: number) => (dispatch: Dispatch) => {
//   dispatch(connectorHubAsyncActions.request());
//   dispatch(
//     withAuth((api: Api, dispatch: Dispatch) => {
//       return api.getConnectors().then((result: AxiosResponse<ConnectorModal[]>) => {
//         dispatch(connectorHubAsyncActions.success(result.data));
//       });
//     })
//   );
// };
