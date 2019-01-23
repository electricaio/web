import { webhooksReducer } from '../reducer';
import { WebhooksState, WebhookModal, WebhookTypes } from '../types';

const initialState: WebhooksState = {
  data: [],
};

describe('webhooks reducer', () => {
  describe('fetch webhooks', () => {
    it('sets data to the payload that is enterig', () => {
      const fetchedData: WebhookModal[] = [
        {
          name: 'Webhook Test',
          isPublic: false,
          connectionId: 1,
          accessKeyId: 1,
          createdAt: '2018-11-20T18:42:08.552',
          id: 12,
          invokeUrl: 'webhook.private',
          publicInvokeUrl: 'webhook.public',
        },
      ];

      expect(
        webhooksReducer(initialState, {
          type: WebhookTypes.FETCH_WEBHOOKS_SUCCESS,
          payload: fetchedData,
        })
      ).toEqual({
        ...initialState,
        data: fetchedData,
      });
    });
  });

  describe('create webhooks', () => {
    const newWebHooks: WebhookModal = {
      name: 'New Webhook Test',
      connectionId: 1,
      isPublic: false,
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      invokeUrl: 'webhook.private',
      publicInvokeUrl: 'webhook.public',
    };
    it('concats webhooks to the data state', () => {
      expect(
        webhooksReducer(initialState, {
          type: WebhookTypes.CREATE_WEBHOOK_SUCCESS,
          payload: [newWebHooks],
        })
      ).toEqual({
        ...initialState,
        data: [newWebHooks],
      });
    });
  });
  describe('delete connection', () => {
    it('removes the webhooks from the state', () => {
      const webhookId = 123;
      const stateWithConnection: WebhooksState = {
        data: [
          {
            name: 'Delete Webhook',
            isPublic: false,
            connectionId: 1,
            accessKeyId: 1,
            createdAt: '2018-11-20T18:42:08.552',
            id: webhookId,
            invokeUrl: 'webhook.private',
            publicInvokeUrl: 'webhook.public',
          },
        ],
      };
      expect(
        webhooksReducer(stateWithConnection, {
          type: WebhookTypes.DELETE_WEBHOOK_SUCCESS,
          payload: webhookId,
        })
      ).toEqual({
        ...initialState,
        data: [],
      });
    });
  });
});
