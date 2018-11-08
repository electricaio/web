import { login, PREFIX } from '../api';
import axios from 'axios';
jest.mock('axios');

describe('api', () => {
  describe('login', () => {
    const username = 'chris';
    const password = 'secret';

    beforeEach(() => {
      this.postSpy = jest.spyOn(axios, 'post');
      process.env.AUTH_TOKEN = '123';
      process.env.API_ENDPOINT = 'api-endpoint.com';
      login(username, password);
    });

    it('uses post method', () => {
      expect(this.postSpy).toBeCalled();
    });

    it('passes oauth url with endpoint env var', () => {
      expect(this.postSpy.mock.calls[0][0]).toEqual(`${process.env.API_ENDPOINT}/oauth/token`);
    });

    it('passes form data with username, password and grant type', () => {
      const formData = this.postSpy.mock.calls[0][1];
      expect(formData.get('username')).toEqual(`${PREFIX}${username}`);
      expect(formData.get('password')).toEqual(password);
      expect(formData.get('grant_type')).toEqual('password');
    });

    it('passes auth token in header', () => {
      expect(this.postSpy.mock.calls[0][2].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });
});
