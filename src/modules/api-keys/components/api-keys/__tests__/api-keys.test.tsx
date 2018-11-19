import { shallow } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { ApiKeysTable } from '../../table/table';
import { ApiKeys } from '../api-keys';
import { ApiIcon } from '../api-keys.css';
import { Header } from '../../../../ui-kit/header';

describe('ApiKeys', () => {
  const onRemoveMock = jest.fn();
  const onCommitMock = jest.fn();
  const onRefreshMock = jest.fn();
  const userId = 5;

  beforeEach(() => {
    this.component = shallow(
      <ApiKeys
        apiKeys={API_KEYS_TABLE_DATA}
        userId={userId}
        removeKey={onRemoveMock}
        createKey={onCommitMock}
        refreshKey={onRefreshMock}
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
  });
});
