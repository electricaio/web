import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ApiKeysComponent } from '../api-keys.container';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';
import { AsyncComponent } from '../../../../../components/async-component/async-component';
import { ApiKeys } from '../../../components/api-keys/api-keys';

describe('API Keys Container', () => {
  const apiKeys: ApiKeyModal[] = [];
  const userId: number = 1;
  const fetchKeys = jest.fn();

  let container: ShallowWrapper;
  let removeKeyMock: jest.Mock;
  let createKeyMock: jest.Mock;
  let refreshKeyMock: jest.Mock;
  beforeEach(() => {
    removeKeyMock = jest.fn();
    createKeyMock = jest.fn();
    refreshKeyMock = jest.fn();
    container = shallow(
      <ApiKeysComponent
        apiKeys={apiKeys}
        userId={userId}
        removeKey={removeKeyMock}
        createKey={createKeyMock}
        fetchKeys={fetchKeys}
        refreshKey={refreshKeyMock}
      />
    );
  });

  describe('async component', () => {
    it('renders the component', () => {
      expect(container.find(AsyncComponent)).toHaveLength(1);
    });

    it('passes fetchConnectors action', () => {
      const actions = container.find(AsyncComponent).prop('getAsyncActions');
      actions();
      expect(fetchKeys).toBeCalledWith(userId);
    });
  });

  it('renders api keys module', () => {
    expect(container.find(ApiKeys)).toHaveLength(1);
  });

  it('passes crud actions to api keys module', () => {
    const apiKeys = container.find(ApiKeys);
    expect(apiKeys.prop('removeKey')).toEqual(removeKeyMock);
    expect(apiKeys.prop('refreshKey')).toEqual(refreshKeyMock);
    expect(apiKeys.prop('createKey')).toEqual(createKeyMock);
    expect(apiKeys.prop('userId')).toEqual(userId);
  });
});
