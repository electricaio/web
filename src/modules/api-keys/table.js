import React, { Fragment } from 'react';
import { Table, Divider, Button } from 'antd';

import { RefreshButton, DeleteButton, PullRight } from './table.css';

const columns = [
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
    dataIndex: 'created',
    key: 'created',
  },

  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <RefreshButton>Refresh</RefreshButton>
        <Divider type="vertical" />
        <DeleteButton>Delete</DeleteButton>
      </span>
    ),
  },
];

const data = [
  {
    key: '92392',
    name: 'Development',
    created: '11/1/16',
  },
  {
    key: '236232',
    name: 'Staging',
    created: '11/1/16',
  },
  {
    key: '232932',
    name: 'Production',
    created: '11/1/16',
  },
];

function StlTable() {
  return (
    <Fragment>
      <Table columns={columns} dataSource={data} />
      <PullRight>
        <Button type="primary">New</Button>
      </PullRight>
    </Fragment>
  );
}

export default StlTable;
