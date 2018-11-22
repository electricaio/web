import React from 'react';
import { mount } from 'enzyme';
import { ApiKeysComponent } from '../api-keys.container';
import { ApiKeys } from '../../../components/api-keys/api-keys';
import { ApiKeyModal, ApiHiddenKeyModal } from '../../../../../redux/api-keys/types';

describe('API Keys Container', () => {
  const apiKeys: ApiKeyModal[] = [];
  const hiddenKey: ApiHiddenKeyModal = {
    createdAt: '2018-11-20T18:42:08.552',
    id: 1,
    jti: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    key: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    name: 'Development',
    revisionVersion: 0,
    updatedAt: '2018-11-22T15:14:38.718Z',
    userId: 1,
  };
  const userId: number = 1;
  const fetchKeys = jest.fn();

  beforeEach(() => {
    this.container = mount(
      <ApiKeysComponent
        apiKeys={apiKeys}
        hiddenKey={hiddenKey}
        userId={userId}
        removeKey={jest.fn()}
        createKey={jest.fn()}
        fetchKeys={fetchKeys}
        refreshKey={jest.fn()}
        getKey={jest.fn()}
      />
    );
  });

  it('calls fetchKeys with the userId', () => {
    expect(fetchKeys).toBeCalledWith(userId);
  });

  it('renders api keys module', () => {
    expect(this.container.find(ApiKeys)).toHaveLength(1);
  });
});
