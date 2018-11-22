import { shallow } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { ApiKeysTable } from '../../table/table';
import { ApiKeys } from '../api-keys';
import { ApiIcon } from '../api-keys.css';
import { Header } from '../../../../ui-kit/header';
import { ApiHiddenKeyModal } from '../../../../../redux/api-keys/types';

describe('ApiKeys', () => {
  const onRemoveMock = jest.fn();
  const onCommitMock = jest.fn();
  const onRefreshMock = jest.fn();
  const getKeyMock = jest.fn();
  const userId = 5;
  const hiddenKey: ApiHiddenKeyModal = {
    createdAt: '2018-11-22T15:14:38.718Z',
    id: 0,
    jti: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    key: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    name: 'test',
    revisionVersion: 0,
    updatedAt: '2018-11-22T15:14:38.718Z',
    userId: 5,
  };

  beforeEach(() => {
    this.component = shallow(
      <ApiKeys
        apiKeys={API_KEYS_TABLE_DATA}
        hiddenKey={hiddenKey}
        userId={userId}
        removeKey={onRemoveMock}
        createKey={onCommitMock}
        refreshKey={onRefreshMock}
        getKey={getKeyMock}
      />
    );
  });

  it('renders primary button for creating a new api key', () => {
    expect(this.component).toHaveLength(1);
  });

  it('renders a header with an icon', () => {
    const header = this.component.find(Header);
    expect(header).toHaveLength(1);
    expect(header.find(ApiIcon)).toHaveLength(1);
  });

  it('Has Table', () => {
    expect(this.component.find(ApiKeysTable)).toHaveLength(1);
  });

  describe('table', () => {
    beforeEach(() => {
      this.table = this.component.find(ApiKeysTable);
    });

    it('calls remove action when onRemove is called', () => {
      this.table.prop('onRemove')();
      expect(onRemoveMock).toBeCalled();
    });

    it('calls refresh action when onRefresh is called', () => {
      this.table.prop('onRefresh')();
      expect(onRefreshMock).toBeCalled();
    });

    it('calls get key action when getKey is called', () => {
      this.table.prop('getKey')();
      expect(getKeyMock).toBeCalled();
    });
  });
});
