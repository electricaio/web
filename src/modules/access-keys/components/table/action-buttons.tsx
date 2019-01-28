import React, { SFC } from 'react';
import { Container, DeleteIcon, WarningIcon } from './action-buttons.css';
import { Icon, Popconfirm, Tooltip } from 'antd';
export type TActionButtonsNewProps = {
  onRemove: () => void;
  onRefresh: () => void;
  name: string;
};

export const ActionButtons: SFC<TActionButtonsNewProps> = ({ name, onRefresh, onRemove }) => (
  <Container>
    <Tooltip placement="top" title="Refresh" data-test="tooltip1">
      <Popconfirm
        icon={<WarningIcon type="question-circle-o" />}
        placement="top"
        title={`Are you sure want to generate a new key?`}
        onConfirm={onRefresh}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="sync" />
      </Popconfirm>
    </Tooltip>
    <Tooltip placement="top" title="Delete" data-test="tooltip2">
      <Popconfirm
        icon={<DeleteIcon type="question-circle-o" />}
        placement="top"
        title={`Delete ${name} key?`}
        onConfirm={onRemove}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="delete" />
      </Popconfirm>
    </Tooltip>
  </Container>
);
