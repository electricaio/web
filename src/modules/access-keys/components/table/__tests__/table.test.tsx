import { shallow, mount } from 'enzyme';
import React from 'react';
import { API_KEYS_TABLE_DATA } from '../../../../../fixtures/access-keys-table-data';
import { AccessKeysTable } from '../table';
import { Table } from 'antd';
import { AccessKeyModal } from '../../../../../redux/access-keys/types';
import { DateComponent } from '../../../../ui-kit/date';

describe('AccessKeys | table Component', () => {
  const data: AccessKeyModal[] = [
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
      <AccessKeysTable
        data={API_KEYS_TABLE_DATA}
        onRemove={onRemoveMock}
        onRefresh={onRefreshMock}
      />
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
    const entity: AccessKeyModal = {
      name: 'test',
      id: 1,
      key: '1234567',
      createdAt: '2018-11-10T18:42:08.552',
    };
    const formattedDate = mount(<DateComponent date={entity.createdAt} />);
    expect(formattedDate.find(DateComponent).text()).toEqual('10.11.2018');
  });

  it('passes entity to HiddenAccessKeyModal', () => {
    const showKeyButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: AccessKeyModal) => col.key === 'key');
    const entity = {
      id: 1,
      name: 'test',
    };
    const hiddenAccessKeyModal = showKeyButtonColumn.render(entity);
    expect(hiddenAccessKeyModal.props.entity).toEqual(entity);
  });

  it('passes entity createdAt to Date', () => {
    const dateColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: AccessKeyModal) => col.key === 'created');
    const entity = {
      id: 1,
      name: 'test',
      createdAt: '2018-11-10T18:42:08.552',
    };
    const dateComponent = dateColumn.render(entity);
    expect(dateComponent.props.date).toEqual(entity.createdAt);
  });

  it('passes entity name to action buttons', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: AccessKeyModal) => col.key === 'action');
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
      .find((col: AccessKeyModal) => col.key === 'action');
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
      .find((col: AccessKeyModal) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRefresh();
    expect(onRefreshMock).toBeCalled();
  });
});
