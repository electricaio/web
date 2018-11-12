import {
  login,
  PREFIX,
  getConnectors,
  createAccessKey,
  refreshAccessKey,
  removeAccessKey,
  getAccessKeys,
} from '../api';
import axios from 'axios';
jest.mock('axios');

describe('api', () => {
  beforeEach(() => {
    process.env.AUTH_TOKEN = '123';
    process.env.API_ENDPOINT = 'api-endpoint.com';
    (localStorage.getItem as any).mockReturnValue(JSON.stringify({ access_token: 123 }));
  });

  describe('login', () => {
    const username = 'chris';
    const password = 'secret';

    beforeEach(() => {
      this.postSpy = jest.spyOn(axios, 'post');
      login(username, password);
    });

    afterEach(() => {
      this.postSpy.mockReset();
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

  describe('getAccessKeys', () => {
    beforeEach(() => {
      this.getSpy = jest.spyOn(axios, 'get');
    });

    afterEach(() => {
      this.getSpy.mockReset();
    });

    it('uses get method', () => {
      getAccessKeys();
      expect(this.getSpy).toBeCalled();
    });

    it('uses access-keys route', () => {
      getAccessKeys();
      expect(this.getSpy.mock.calls[0][0]).toEqual(`${process.env.API_ENDPOINT}/v1/access-keys`);
    });

    it('passes auth token in header', () => {
      getAccessKeys();
      expect(this.getSpy.mock.calls[0][1].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });

  describe('removeAccessKey', () => {
    const accessKeyId = '123';

    beforeEach(() => {
      this.deleteSpy = jest.spyOn(axios, 'delete');
    });

    afterEach(() => {
      this.deleteSpy.mockReset();
    });

    it('uses delete method', () => {
      removeAccessKey(accessKeyId);
      expect(this.deleteSpy).toBeCalled();
    });

    it('uses access-keys route with access key id', () => {
      removeAccessKey(accessKeyId);
      expect(this.deleteSpy.mock.calls[0][0]).toEqual(
        `${process.env.API_ENDPOINT}/v1/access-keys/${accessKeyId}`
      );
    });

    it('passes auth token in header', () => {
      removeAccessKey(accessKeyId);
      expect(this.deleteSpy.mock.calls[0][1].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });

  describe('refreshAccessKey', () => {
    const accessKeyId = '123';

    beforeEach(() => {
      this.postSpy = jest.spyOn(axios, 'post');
    });

    afterEach(() => {
      this.postSpy.mockReset();
    });

    it('uses post method', () => {
      refreshAccessKey(accessKeyId);
      expect(this.postSpy).toBeCalled();
    });

    it('uses access-keys route with access key id', () => {
      refreshAccessKey(accessKeyId);
      expect(this.postSpy.mock.calls[0][0]).toEqual(
        `${process.env.API_ENDPOINT}/v1/access-keys/${accessKeyId}/refresh`
      );
    });

    it('passes auth token in header', () => {
      refreshAccessKey(accessKeyId);
      expect(this.postSpy.mock.calls[0][2].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });

  describe('createAccessKey', () => {
    const accessKetData = {
      accessKey: '124',
      name: 'development access key',
    };

    beforeEach(() => {
      this.postSpy = jest.spyOn(axios, 'post');
    });

    afterEach(() => {
      this.postSpy.mockReset();
    });

    it('uses post method', () => {
      createAccessKey(accessKetData);
      expect(this.postSpy).toBeCalled();
    });

    it('uses access-keys route', () => {
      createAccessKey(accessKetData);
      expect(this.postSpy.mock.calls[0][0]).toEqual(`${process.env.API_ENDPOINT}/v1/access-keys`);
    });

    it('passes new access key data to post', () => {
      createAccessKey(accessKetData);
      expect(this.postSpy.mock.calls[0][1]).toEqual(accessKetData);
    });

    it('passes auth token in header', () => {
      createAccessKey(accessKetData);
      expect(this.postSpy.mock.calls[0][2].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });

  describe('getConnectors', () => {
    beforeEach(() => {
      this.getSpy = jest.spyOn(axios, 'get');
    });

    afterEach(() => {
      this.getSpy.mockReset();
    });

    it('uses post method', () => {
      getConnectors();
      expect(this.getSpy).toBeCalled();
    });

    it('passes oauth url with endpoint env var', () => {
      getConnectors();
      expect(this.getSpy.mock.calls[0][0]).toEqual(`${process.env.API_ENDPOINT}/v1/connectors`);
    });

    it('passes auth token in header', () => {
      getConnectors();
      expect(this.getSpy.mock.calls[0][1].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });
});
