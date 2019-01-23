import { withAuth } from '../../util';
import { WebhookModal, WebhookTypes } from '../types';
import { createWebhook, deleteWebhook, fetchWebhooks } from '../async';

jest.mock('../../../modules/utils/api');
jest.mock('../../util');

describe('Webhook Async Actions', () => {
  const testWebhooks: WebhookModal = {
    name: 'Webhook Test',
    isPublic: false,
    accessKeyId: 1,
    connectionId: 1,
    createdAt: '2018-11-20T18:42:08.552',
    id: 12,
    invokeUrl: 'webhook.private',
    publicInvokeUrl: 'webhook.public',
  };

  let dispatchMock: jest.Mock;
  let mockApi: any;

  beforeEach(() => {
    mockApi = {
      createWebhook: jest.fn(() => Promise.resolve({ data: testWebhooks })),
      deleteWebhook: jest.fn(() => Promise.resolve()),
      fetchWebhooks: jest.fn(() => Promise.resolve({ data: [testWebhooks] })),
    };
    dispatchMock = jest.fn();
    (withAuth as any).mockImplementation((_: any, callback: any) => {
      callback(mockApi, dispatchMock);
    });
  });

  describe('createWebhook', () => {
    it('dispatches CREATE_WEBHOOK action', async () => {
      await createWebhook(testWebhooks)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];

      expect(firstDispatchCall.type).toEqual(WebhookTypes.CREATE_WEBHOOK);
    });

    it('dispatch CREATE_WEBHOOK_SUCCESS action', async () => {
      await createWebhook(testWebhooks)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(WebhookTypes.CREATE_WEBHOOK_SUCCESS);
    });

    it('dispatch response payload to reducers', async () => {
      await createWebhook(testWebhooks)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.payload).toEqual(testWebhooks);
    });
  });

  describe('deleteWebhooks', () => {
    it('dispatch DELETE_WEBHOOK_ERROR action', async () => {
      await deleteWebhook(testWebhooks.id)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];

      expect(successDispatchCall.type).toEqual(WebhookTypes.DELETE_WEBHOOK_SUCCESS);
    });

    it('dispatch connection id payload to reducers', async () => {
      await deleteWebhook(testWebhooks.id)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.payload).toEqual(testWebhooks.id);
    });
  });

  describe('fetchWebhooks', () => {
    const connectionId = 12;
    it('dispatches FETCH_WEBHOOKS action', async () => {
      await fetchWebhooks(connectionId)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];
      expect(firstDispatchCall.type).toEqual(WebhookTypes.FETCH_WEBHOOKS);
    });

    it('dispatches access keys to reducer', async () => {
      await fetchWebhooks(connectionId)(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[1][0];
      expect(firstDispatchCall.payload).toEqual([testWebhooks]);
    });

    it('dispatch FETCH_WEBHOOKS_SUCCESS action', async () => {
      await fetchWebhooks(connectionId)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(WebhookTypes.FETCH_WEBHOOKS_SUCCESS);
    });

    it('call api with user id and connector id', async () => {
      await fetchWebhooks(connectionId)(dispatchMock);
      expect(mockApi.fetchWebhooks).toBeCalledWith(connectionId);
    });
  });
});
