import React, { SFC } from 'react';
import { Container, DeleteIcon } from './action-buttons.css';
import { Icon, Popconfirm, Tooltip } from 'antd';
export type TActionButtonsNewProps = {
  onRemove: () => void;
  onEdit: () => void;
  name: string;
};

export const ActionButtons: SFC<TActionButtonsNewProps> = ({ name, onEdit, onRemove }) => (
  <Container>
    <Tooltip placement="top" title="Edit">
      <Icon type="edit" onClick={onEdit} />
    </Tooltip>
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
  </Container>
);
