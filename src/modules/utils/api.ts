import axios, { AxiosPromise } from 'axios';

export const PREFIX = '@e:';

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
