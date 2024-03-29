import { shallow } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/access-keys-table-data';
import { AccessKeysTable } from '../../table/table';
import { AccessKeys } from '../access-keys';
import { ApiIcon } from '../access-keys.css';
import { Header } from '../../../../ui-kit/header';
import { ButtonActionModal } from '../../../../ui-kit/modal-button-action/modal-button-action';

describe('AccessKeys', () => {
  const onRemoveMock = jest.fn();
  const onCommitMock = jest.fn();
  const onRefreshMock = jest.fn();
  const userId = 5;

  beforeEach(() => {
    this.component = shallow(
      <AccessKeys
        accessKeys={API_KEYS_TABLE_DATA}
        userId={userId}
        removeKey={onRemoveMock}
        createKey={onCommitMock}
        refreshKey={onRefreshMock}
      />
    );
  });

  it('renders primary button for creating a new access key', () => {
    expect(this.component).toHaveLength(1);
  });

  it('renders a header with an icon', () => {
    const header = this.component.find(Header);
    expect(header).toHaveLength(1);
    expect(header.find(ApiIcon)).toHaveLength(1);
  });

  it('Has Table', () => {
    expect(this.component.find(AccessKeysTable)).toHaveLength(1);
  });

  it('Has ButtonActionModal', () => {
    expect(this.component.find(ButtonActionModal)).toHaveLength(1);
  });

  describe('table', () => {
    beforeEach(() => {
      this.table = this.component.find(AccessKeysTable);
    });

    it('calls remove action when onRemove is called', () => {
      this.table.prop('onRemove')();
      expect(onRemoveMock).toBeCalled();
    });

    it('calls refresh action when onRefresh is called', () => {
      this.table.prop('onRefresh')();
      expect(onRefreshMock).toBeCalled();
    });
  });
});
