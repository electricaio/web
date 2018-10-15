import * as React from 'react';
import { Component, Fragment, SFC } from 'react';
import { Button, Table } from 'antd';
import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { ActionButtons } from './action-buttons';
import { PullRight } from './table.css';
import { format } from 'date-fns';

type TDateProps = {
  date: Date;
};

const Date: SFC<TDateProps> = ({ date }) => <div>{format(date, 'DD.MM.YYYY')}</div>;

//

export type TApiKeysTableProps = {
  data: TApiKeyTableEntity[];
  onRemove: (id: string) => void;
  onRefresh: (id: string) => void;
};

export type TApiKeysTableState = {
  isNewEntity: boolean;
};

export class ApiKeysTable extends Component<TApiKeysTableProps, TApiKeysTableState> {
  readonly state: TApiKeysTableState = {
    isNewEntity: false,
  };

  render() {
    const { data, onRemove, onRefresh } = this.props;
    const columns = getColumns(onRefresh, onRemove);

    return (
      <Fragment>
        <Table columns={columns} dataSource={data} />
        <PullRight>
          <Button type="primary" onClick={this.showNewEntityForm}>
            New
          </Button>
        </PullRight>
      </Fragment>
    );
  }

  showNewEntityForm = () => {
    const { isNewEntity } = this.state;

    if (!isNewEntity) {
      this.setState(() => ({ isNewEntity: true }));
    }
  };
}

function getColumns(handleRefresh: (id: string) => void, handleRemove: (id: string) => void) {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Data Created',
      key: 'created',
      render: (entity: TApiKeyTableEntity) => <Date date={entity.created} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (entity: TApiKeyTableEntity) => (
        <ActionButtons entity={entity} onRefresh={handleRefresh} onRemove={handleRemove} />
      ),
    },
  ];
}
