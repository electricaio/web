import { shallow, mount } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/api-keys-table-data';
import { ApiKeysTable, Date } from '../table';
import { Table } from 'antd';
import { ApiKeyModal } from '../../../../../redux/api-keys/types';

describe('ApiKeys | table Component', () => {
  const data: ApiKeyModal[] = [
    {
      id: 1,
      name: 'Development',
      key: 'Development',
      createdAt: '2018-11-20T18:42:08.552',
    },
    {
      id: 2,
      name: 'Staging',
      key: 'Staging',
      createdAt: '2018-10-19T18:42:08.552',
    },
    {
      id: 3,
      name: 'Production',
      key: 'Production',
      createdAt: '2018-11-15T18:42:08.552',
    },
  ];

  const onRemoveMock = jest.fn();
  const onRefreshMock = jest.fn();
  beforeEach(() => {
    this.component = shallow(
      <ApiKeysTable data={API_KEYS_TABLE_DATA} onRemove={onRemoveMock} onRefresh={onRefreshMock} />
    );
  });

  it('renders 4 columns', () => {
    const columns = this.component.find(Table).prop('columns');
    const columnNames = columns.map((col: any) => col.title);
    expect(columnNames).toEqual(['Name', 'Key', 'Date Created', 'Action']);
  });

  it('passes in data to table', () => {
    expect(this.component.find(Table).prop('dataSource')).toEqual(data);
  });

  it('shows formatted date', () => {
    const entity: ApiKeyModal = {
      name: 'test',
      id: 1,
      key: '1234567',
      createdAt: '2018-11-10T18:42:08.552',
    };
    const formattedDate = mount(<Date date={entity.createdAt} />);
    expect(formattedDate.find(Date).text()).toEqual('10.11.2018');
  });

  it('passes entity name to action buttons', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ApiKeyModal) => col.key === 'action');
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
      .find((col: ApiKeyModal) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRemove();
    expect(onRemoveMock).toBeCalled();
  });

  it('calls onRefresh props when refresh action button is called', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ApiKeyModal) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRefresh();
    expect(onRefreshMock).toBeCalled();
  });
});
