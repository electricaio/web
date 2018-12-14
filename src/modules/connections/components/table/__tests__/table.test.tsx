import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { ConnectionsTable } from '../table';
import { Table, Select } from 'antd';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';
import { ConnectionModal } from '../../../../../redux/connections/types';
import { ColumnProps } from 'antd/lib/table';
import { AccessKeyName } from '../table.css';
import { MemoryRouter } from 'react-router';

describe('Connections Table', () => {
  const accessKeyName = 'Development';
  const connectionsData: ConnectionModal[] = [
    {
      id: 1,
      name: 'Uber',
      accessKeyId: 1,
      connectorId: 1,
    },
    {
      id: 2,
      name: 'GE',
      accessKeyId: 1,
      connectorId: 1,
    },
    {
      id: 3,
      name: 'Pure Storage',
      accessKeyId: 1,
      connectorId: 1,
    },
  ];

  const accessKeysData: ApiKeyModal[] = [
    {
      id: 1,
      name: accessKeyName,
      key: 'Development',
      createdAt: '',
    },
  ];

  const onRemoveMock = jest.fn();
  beforeEach(() => {
    this.component = mount(
      <MemoryRouter>
        <ConnectionsTable
          accessKeys={accessKeysData}
          connections={connectionsData}
          onRemove={onRemoveMock}
        />
      </MemoryRouter>
    );
  });

  it('renders 5 columns', () => {
    const columns = this.component.find(Table).prop('columns');
    expect(columns).toHaveLength(5);
  });

  it('passes in data to table', () => {
    expect(this.component.find(Table).prop('dataSource')).toEqual(connectionsData);
  });

  it('passes entity name to action buttons', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ColumnProps<ConnectionModal>) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    expect(actionButtons.props.name).toEqual(entity.name);
  });

  it('calls onRemove props when delete action button is called', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ColumnProps<ConnectionModal>) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRemove();
    expect(onRemoveMock).toBeCalled();
  });

  it('renders access key name in access key column', () => {
    expect(
      this.component
        .find(Table)
        .find(AccessKeyName)
        .everyWhere((comp: ReactWrapper) => comp.text() === accessKeyName)
    ).toBeTruthy();
  });

  describe('onFilter', () => {
    beforeEach(() => {
      this.accessKeysFilter = this.component
        .find(Table)
        .prop('columns')
        .find((col: ColumnProps<ConnectionModal>) => col.key === 'accessKeyId');
    });

    it('returns true if the value if equal to the record that is being rendered', () => {
      expect(this.accessKeysFilter.onFilter(accessKeyName, connectionsData[0])).toBeTruthy();
    });

    it('returns false if the record does not include the access key name that will be filtered', () => {
      expect(
        this.accessKeysFilter.onFilter(
          'access key not related to record passed',
          connectionsData[0]
        )
      ).toBeFalsy();
    });
  });

  describe('FilterDropdown', () => {
    let setSelectedKeys: jest.Mock;
    let confirm: jest.Mock;
    beforeEach(() => {
      setSelectedKeys = jest.fn();
      confirm = jest.fn();
      const accessKeysFilter = this.component
        .find(Table)
        .prop('columns')
        .find((col: ColumnProps<ConnectionModal>) => col.key === 'accessKeyId');
      this.filterDropdown = new ReactWrapper(
        accessKeysFilter.filterDropdown({ setSelectedKeys, confirm })
      );
    });

    it('renders dropdown menu to filter access keys', () => {
      const selectComponent = this.filterDropdown.find(Select);
      expect(selectComponent.prop('showSearch')).toBeTruthy();
      expect(selectComponent.prop('placeholder')).toEqual('Filter by Access key');
    });

    it('calls setSelectedkeys and confirm when changes the dropdown', () => {
      const value = 'test';
      const selectComponent = this.filterDropdown.find(Select);
      selectComponent.prop('onChange')(value);
      expect(confirm).toBeCalled();
      expect(setSelectedKeys).toBeCalledWith([value]);
    });
  });
});
