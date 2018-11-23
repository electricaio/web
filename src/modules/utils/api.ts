import axios, { AxiosPromise } from 'axios';

export const PREFIX = '@e:';
export const AUTH_TOKENS_STORAGE_KEY = 'auth.tokens';

export type AUTH_TOKEN_TYPE = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

const createAuthHeader = () => ({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(AUTH_TOKENS_STORAGE_KEY)).access_token}`,
});

export function login(username: string, password: string): AxiosPromise {
  const headers = {
    Authorization: `Basic ${process.env.AUTH_TOKEN}`,
  };
  const bodyFormData = new FormData();
  bodyFormData.set('username', `${PREFIX}${username}`);
  bodyFormData.set('password', password);
  bodyFormData.set('grant_type', 'password');

  return axios.post(`${process.env.API_ENDPOINT}/oauth/token`, bodyFormData, { headers });
}

export function getConnectors() {
  return axios.get(`${process.env.API_ENDPOINT}/public/v1/connectors`, {
    headers: createAuthHeader(),
  });
}

export function getAccessKeys(userId: number) {
  return axios.get(`${process.env.API_ENDPOINT}/v1/users/${userId}/access-keys`, {
    headers: createAuthHeader(),
  });
}

export function getAccessKey(accessKeyId: number) {
  return axios.get(`${process.env.API_ENDPOINT}/v1/access-keys/${accessKeyId}`, {
    headers: createAuthHeader(),
  });
}

export function createAccessKey(data: any) {
  return axios.post(`${process.env.API_ENDPOINT}/v1/access-keys`, data, {
    headers: createAuthHeader(),
  });
}

export function refreshAccessKey(accessKeyId: number) {
  return axios.put(
    `${process.env.API_ENDPOINT}/v1/access-keys/${accessKeyId}/refresh`,
    {},
    { headers: createAuthHeader() }
  );
}

export function removeAccessKey(accessKeyId: number) {
  return axios.delete(`${process.env.API_ENDPOINT}/v1/access-keys/${accessKeyId}`, {
    headers: createAuthHeader(),
  });
}

export function getUser() {
  return axios.get(`${process.env.API_ENDPOINT}/v1/me/user`, {
    headers: createAuthHeader(),
  });
}
