import axios, { AxiosPromise, AxiosInstance } from 'axios';
import { SignupParamsType, TokenState } from '../../redux/auth/types';
import { ConnectionModal, AuthorizationType } from '../../redux/connections/types';
import { WebhookModalRequest } from '../../redux/webhooks/types';

export const PREFIX = '@e:';
export const AUTH_TOKENS_STORAGE_KEY = 'auth.tokens';

export class Api {
  apiInstance: AxiosInstance;

  constructor(tokens?: TokenState) {
    this.apiInstance = axios.create({
      baseURL: process.env.API_ENDPOINT,
      headers: tokens
        ? {
            Authorization: `Bearer ${tokens.access_token}`,
          }
        : {},
    });
  }

  login(username: string, password: string): AxiosPromise {
    const headers = {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
    };
    const bodyFormData = new FormData();
    bodyFormData.set('username', `${PREFIX}${username}`);
    bodyFormData.set('password', password);
    bodyFormData.set('grant_type', 'password');
    return this.apiInstance.post(`/oauth/token`, bodyFormData, { headers });
  }

  createUser(bodyFormData: SignupParamsType): AxiosPromise {
    const headers = {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
    };
    return this.apiInstance.post(`/public/v1/users`, bodyFormData, { headers });
  }

  refreshToken(refreshToken: string): AxiosPromise {
    const bodyFormData = new FormData();
    bodyFormData.set('client_id', 'frontend-test');
    bodyFormData.set('client_secret', 'change_me');
    bodyFormData.set('refresh_token', refreshToken);
    bodyFormData.set('grant_type', 'refresh_token');
    return this.apiInstance.post('/oauth/token', bodyFormData);
  }

  getConnectors(): AxiosPromise {
    return this.apiInstance.get(`/v1/connectors`);
  }

  getConnector(connectorId: number): AxiosPromise {
    return this.apiInstance.get(`/v1/connectors/${connectorId}`);
  }

  getAccessKeys(userId: number): AxiosPromise {
    return this.apiInstance.get(`/v1/users/${userId}/access-keys`);
  }

  getAccessKey(accessKeyId: number): AxiosPromise {
    return this.apiInstance.get(`/v1/access-keys/${accessKeyId}`);
  }

  createAccessKey(data: any): AxiosPromise {
    return this.apiInstance.post(`/v1/access-keys`, data);
  }

  refreshAccessKey(accessKeyId: number): AxiosPromise {
    return this.apiInstance.put(`/v1/access-keys/${accessKeyId}/refresh`, {});
  }

  removeAccessKey(accessKeyId: number): AxiosPromise {
    return this.apiInstance.delete(`/v1/access-keys/${accessKeyId}`);
  }

  getUser(): AxiosPromise {
    return this.apiInstance.get('v1/me/user');
  }

  fetchConnections(userId: number, connectorId: number): AxiosPromise {
    return this.apiInstance.get(`/v1/users/${userId}/connections?connectorId=${connectorId}`);
  }

  fetchConnection(connectionId: number): AxiosPromise {
    return this.apiInstance.get(`/v1/connections/${connectionId}`);
  }

  createConnection(connection: ConnectionModal): AxiosPromise {
    return this.apiInstance.post(`/v1/connections/`, connection);
  }

  updateConnection(connectionId: number, connection: ConnectionModal): AxiosPromise {
    return this.apiInstance.put(`/v1/connections/${connectionId}`, connection);
  }

  deleteConnection(connectionId: number): AxiosPromise {
    return this.apiInstance.delete(`/v1/connections/${connectionId}`);
  }

  createConnectionAuthorization(
    connection: ConnectionModal,
    authorizationTypeName: string,
    authorizationType: AuthorizationType
  ): AxiosPromise {
    return this.apiInstance.post(
      `/v1/connections/${connection.id}/authorizations/${authorizationTypeName.toLowerCase()}`,
      authorizationType
    );
  }

  fetchAuthorization(id: number, authorizationTypeName: string): AxiosPromise {
    return this.apiInstance.get(`/v1/authorizations/${id}/${authorizationTypeName.toLowerCase()}`);
  }

  updateAuthorization(
    id: number,
    authorizationTypeName: string,
    authorizationType: AuthorizationType
  ): AxiosPromise {
    return this.apiInstance.put(
      `/v1/authorizations/${id}/${authorizationTypeName.toLowerCase()}`,
      authorizationType
    );
  }

  fetchWebhooks(connectionId: number): AxiosPromise {
    return this.apiInstance.get(`/v1/connections/${connectionId}/webhooks`);
  }

  createWebhook(webhook: WebhookModalRequest): AxiosPromise {
    return this.apiInstance.post(`/v1/webhooks/connection`, webhook);
  }

  deleteWebhook(webhookId: number): AxiosPromise {
    return this.apiInstance.delete(`/v1/webhooks/${webhookId}`);
  }
}
