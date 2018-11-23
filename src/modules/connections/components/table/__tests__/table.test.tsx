import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { ConnectionsTable } from '../table';
import { Table, Select } from 'antd';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';
import { ConnectionModal } from '../../../../../redux/connections/types';
import { ColumnProps } from 'antd/lib/table';
import { AccessKeyName } from '../table.css';

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
      <ConnectionsTable
        accessKeys={accessKeysData}
        connections={connectionsData}
        onRemove={onRemoveMock}
      />
    );
  });

  it('renders 7 columns', () => {
    const columns = this.component.find(Table).prop('columns');
    expect(columns).toHaveLength(7);
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

  it('renders dropdown menu to filter access keys', () => {
    const accessKeysFilter = this.component
      .find(Table)
      .prop('columns')
      .find((col: ColumnProps<ConnectionModal>) => col.key === 'accessKeyId');
    const filterDropdown = new ReactWrapper(accessKeysFilter.filterDropdown());
    const selectComponent = filterDropdown.find(Select);
    expect(selectComponent.prop('showSearch')).toBeTruthy();
    expect(selectComponent.prop('placeholder')).toEqual('Select an Access key');
  });
});
