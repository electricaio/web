export type WebhookModalRequest = {
  accessKeyId: number;
  connectionId: number;
  isPublic: boolean;
  name: string;
};

export type WebhookModal = {
  accessKeyId: number;
  connectionId: number;
  createdAt?: string;
  isPublic: boolean;
  id?: number;
  name: string;
  invokeUrl: string;
  publicInvokeUrl: string;
};

export const enum WebhookTypes {
  FETCH_WEBHOOKS = '@@hub/FETCH_WEBHOOKS',
  FETCH_WEBHOOKS_SUCCESS = '@@hub/FETCH_WEBHOOKS_SUCCESS',
  FETCH_WEBHOOKS_ERROR = '@@hub/FETCH_WEBHOOKS_ERROR',

  CREATE_WEBHOOK = '@@hub/CREATE_WEBHOOK',
  CREATE_WEBHOOK_SUCCESS = '@@hub/CREATE_WEBHOOK_SUCCESS',
  CREATE_WEBHOOK_ERROR = '@@hub/CREATE_WEBHOOK_ERROR',

  DELETE_WEBHOOK = '@@hub/DELETE_WEBHOOK',
  DELETE_WEBHOOK_SUCCESS = '@@hub/DELETE_WEBHOOK_SUCCESS',
  DELETE_WEBHOOK_ERROR = '@@hub/DELETE_WEBHOOK_ERROR',
}

export interface WebhooksState {
  readonly data: WebhookModal[];
}
