import { createAsyncAction } from 'typesafe-actions';
import { WebhookModal, WebhookTypes } from './types';

export const fetchWebhooksAsyncActions = createAsyncAction(
  WebhookTypes.FETCH_WEBHOOKS,
  WebhookTypes.FETCH_WEBHOOKS_SUCCESS,
  WebhookTypes.FETCH_WEBHOOKS_ERROR
)<void, WebhookModal[], string>();

export const createWebhookAsyncActions = createAsyncAction(
  WebhookTypes.CREATE_WEBHOOK,
  WebhookTypes.CREATE_WEBHOOK_SUCCESS,
  WebhookTypes.CREATE_WEBHOOK_ERROR
)<void, WebhookModal, string>();

export const deleteWebhookAsyncActions = createAsyncAction(
  WebhookTypes.DELETE_WEBHOOK,
  WebhookTypes.DELETE_WEBHOOK_SUCCESS,
  WebhookTypes.DELETE_WEBHOOK_ERROR
)<void, number, string>();
