import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AccessKeysComponent } from '../access-keys.container';
import { AccessKeyModal } from '../../../../../redux/access-keys/types';
import { AsyncComponent } from '../../../../../components/async-component/async-component';
import { AccessKeys } from '../../../components/access-keys/access-keys';

describe('Access Keys Container', () => {
  const accessKeys: AccessKeyModal[] = [];
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
      <AccessKeysComponent
        accessKeys={accessKeys}
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

  it('renders access keys module', () => {
    expect(container.find(AccessKeys)).toHaveLength(1);
  });

  it('passes crud actions to access keys module', () => {
    const accessKeys = container.find(AccessKeys);
    expect(accessKeys.prop('removeKey')).toEqual(removeKeyMock);
    expect(accessKeys.prop('refreshKey')).toEqual(refreshKeyMock);
    expect(accessKeys.prop('createKey')).toEqual(createKeyMock);
    expect(accessKeys.prop('userId')).toEqual(userId);
  });
});
