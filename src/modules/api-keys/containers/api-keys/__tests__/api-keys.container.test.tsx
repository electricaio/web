import React from 'react';
import { mount } from 'enzyme';
import { ApiKeysComponent } from '../api-keys.container';
import { ApiKeys } from '../../../components/api-keys/api-keys';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';

describe('API Keys Container', () => {
  const apiKeys: ApiKeyModal[] = [];
  const userId: number = 1;
  const fetchKeys = jest.fn();

  beforeEach(() => {
    this.container = mount(
      <ApiKeysComponent
        apiKeys={apiKeys}
        userId={userId}
        removeKey={jest.fn()}
        createKey={jest.fn()}
        fetchKeys={fetchKeys}
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
