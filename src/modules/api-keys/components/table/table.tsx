import * as React from "react";
import { Fragment } from "react";
import { Button, Divider, Table } from "antd";
import { DeleteButton, PullRight, RefreshButton } from "./theme/table.css";

export const ApiKeysTable = () => (
  <Fragment>
    <Table columns={getColumns()} dataSource={getData()} />
    <PullRight>
      <Button type="primary">New</Button>
    </PullRight>
  </Fragment>
);

function getColumns() {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "Data Created",
      dataIndex: "created",
      key: "created"
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
        <RefreshButton>Refresh</RefreshButton>
        <Divider type="vertical" />
        <DeleteButton>Delete</DeleteButton>
      </span>
      )
    }
  ];
}

function getData() {
  return [
    {
      key: "92392",
      name: "Development",
      created: "11/1/16"
    },
    {
      key: "236232",
      name: "Staging",
      created: "11/1/16"
    },
    {
      key: "232932",
      name: "Production",
      created: "11/1/16"
    }
  ];
}