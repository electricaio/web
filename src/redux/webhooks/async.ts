import { Dispatch } from 'redux';
import { WebhookModal, WebhookModalRequest } from './types';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import {
  createWebhookAsyncActions,
  fetchWebhooksAsyncActions,
  deleteWebhookAsyncActions,
} from './actions';

export const fetchWebhooks = (connectionId: number) => (dispatch: Dispatch) => {
  dispatch(fetchWebhooksAsyncActions.request());
  return withAuth(dispatch, (api: Api) => {
    return api.fetchWebhooks(connectionId).then((result: AxiosResponse) => {
      dispatch(fetchWebhooksAsyncActions.success(result.data));
    });
  });
};

export const deleteWebhook = (webhookId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) => {
    return api.deleteWebhook(webhookId).then(() => {
      dispatch(deleteWebhookAsyncActions.success(webhookId));
    });
  });
};

export const createWebhook = (webhook: WebhookModalRequest) => (dispatch: Dispatch) => {
  dispatch(createWebhookAsyncActions.request());
  withAuth(dispatch, (api: Api) => {
    return api.createWebhook(webhook).then((result: AxiosResponse<WebhookModal>) => {
      dispatch(createWebhookAsyncActions.success(result.data));
    });
  });
};
