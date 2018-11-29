import { Api, PREFIX } from '../api';

import axios from 'axios';
jest.mock('axios');

describe('api', () => {
  let api: Api;
  let postMock: jest.Mock;
  let putMock: jest.Mock;
  let getMock: jest.Mock;
  let deleteMock: jest.Mock;
  beforeEach(() => {
    this.mockAxiosInstance = jest.spyOn(axios, 'create');
    postMock = jest.fn();
    putMock = jest.fn();
    getMock = jest.fn();
    deleteMock = jest.fn();
    this.mockAxiosInstance.mockImplementation(() => ({
      post: postMock,
      put: putMock,
      get: getMock,
      delete: deleteMock,
    }));

    const accessToken = '123';
    api = new Api({ access_token: '123', expires_in: 1234, refresh_token: '123' });

    process.env.AUTH_TOKEN = accessToken;
    process.env.API_ENDPOINT = 'api-endpoint.com';
  });

  describe('login', () => {
    const username = 'chris';
    const password = 'secret';

    beforeEach(() => {
      api.login(username, password);
    });

    it('uses post method', () => {
      expect(postMock).toBeCalled();
    });

    it('passes oauth url with endpoint env var', () => {
      expect(postMock.mock.calls[0][0]).toEqual(`/oauth/token`);
    });

    it('passes form data with username, password and grant type', () => {
      const formData = postMock.mock.calls[0][1];
      expect(formData.get('username')).toEqual(`${PREFIX}${username}`);
      expect(formData.get('password')).toEqual(password);
      expect(formData.get('grant_type')).toEqual('password');
    });

    it('passes auth token in header', () => {
      expect(postMock.mock.calls[0][2].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });

  describe('signup', () => {
    const params: any = {
      email: 'test@test.com',
      firstName: 'First',
      lastName: 'Last',
      organizationId: 1,
      password: 'password',
    };

    beforeEach(() => {
      api.createUser(params);
    });

    it('uses post method', () => {
      expect(postMock).toBeCalled();
    });

    it('passes oauth url with endpoint env var', () => {
      expect(postMock.mock.calls[0][0]).toEqual(`/public/v1/users`);
    });

    it('passes form data with username, password and grant type', () => {
      const formData = postMock.mock.calls[0][1];
      expect(formData).toEqual(params);
    });

    it('passes auth token in header', () => {
      expect(postMock.mock.calls[0][2].headers['Authorization']).toEqual(
        `Basic ${process.env.AUTH_TOKEN}`
      );
    });
  });

  describe('getAccessKeys', () => {
    it('uses get method', () => {
      api.getAccessKeys(1);
      expect(getMock).toBeCalled();
    });

    it('uses access-keys route', () => {
      api.getAccessKeys(1);
      expect(getMock.mock.calls[0][0]).toEqual(`/v1/users/1/access-keys`);
    });
  });

  describe('getAccessKey', () => {
    const accessKeyId = 1;

    beforeEach(() => {
      api.getAccessKey(accessKeyId);
    });

    it('uses get method', () => {
      expect(getMock).toBeCalled();
    });

    it('uses access-keys route with access key id', () => {
      expect(getMock.mock.calls[0][0]).toEqual(`/v1/access-keys/${accessKeyId}`);
    });
  });

  describe('refreshToken', () => {
    const refreshToken = 'refresh';

    beforeEach(() => {
      api.refreshToken(refreshToken);
    });

    it('uses post method', () => {
      expect(postMock).toBeCalled();
    });

    it('uses access-keys route with access key id', () => {
      expect(postMock.mock.calls[0][0]).toEqual('/oauth/token');
    });

    it('passes form data with client_id, client_secret, refresh_token and grant type', () => {
      const formData = postMock.mock.calls[0][1];
      expect(formData.get('client_id')).toEqual('frontend-test');
      expect(formData.get('client_secret')).toEqual('change_me');
      expect(formData.get('refresh_token')).toEqual(refreshToken);
      expect(formData.get('grant_type')).toEqual('refresh_token');
    });
  });

  describe('removeAccessKey', () => {
    const accessKeyId = 1;

    it('uses delete method', () => {
      api.removeAccessKey(accessKeyId);
      expect(deleteMock).toBeCalled();
    });

    it('uses access-keys route with access key id', () => {
      api.removeAccessKey(accessKeyId);
      expect(deleteMock.mock.calls[0][0]).toEqual(`/v1/access-keys/${accessKeyId}`);
    });
  });

  describe('refreshAccessKey', () => {
    const accessKeyId = 1;

    it('uses post method', () => {
      api.refreshAccessKey(accessKeyId);
      expect(putMock).toBeCalled();
    });

    it('uses access-keys route with access key id', () => {
      api.refreshAccessKey(accessKeyId);
      expect(putMock.mock.calls[0][0]).toEqual(`/v1/access-keys/${accessKeyId}/refresh`);
    });
  });

  describe('createAccessKey', () => {
    const accessKetData = {
      accessKey: '124',
      name: 'development access key',
    };

    it('uses post method', () => {
      api.createAccessKey(accessKetData);
      expect(postMock).toBeCalled();
    });

    it('uses access-keys route', () => {
      api.createAccessKey(accessKetData);
      expect(postMock.mock.calls[0][0]).toEqual(`/v1/access-keys`);
    });

    it('passes new access key data to post', () => {
      api.createAccessKey(accessKetData);
      expect(postMock.mock.calls[0][1]).toEqual(accessKetData);
    });
  });

  describe('getConnectors', () => {
    it('uses post method', () => {
      api.getConnectors();
      expect(getMock).toBeCalled();
    });

    it('passes oauth url with endpoint env var', () => {
      api.getConnectors();
      expect(getMock.mock.calls[0][0]).toEqual(`/public/v1/connectors`);
    });
  });

  describe('getUser', () => {
    it('uses get method', () => {
      api.getUser();
      expect(getMock).toBeCalled();
    });

    it('calls user me path', () => {
      api.getUser();
      expect(getMock.mock.calls[0][0]).toEqual(`v1/me/user`);
    });
  });
});
