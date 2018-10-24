import React, { SFC } from 'react';
import { Container, DeleteIcon } from './action-buttons.css';
import { Icon, Popconfirm, Tooltip } from 'antd';
import { ButtonActionModal } from '../modal-button-action/modal-button-action';
export type TActionButtonsNewProps = {
  onRemove: () => void;
  onEdit: () => void;
  name: string;
  apiKey: string;
};

export const ActionButtons: SFC<TActionButtonsNewProps> = ({ apiKey, name, onEdit, onRemove }) => (
  <Container>
    <Tooltip placement="top" title="Edit">
      <ButtonActionModal
        name={name}
        apiKey={apiKey}
        title="Edit API Key"
        submitText="Save"
        onCommit={onEdit}
      >
        <Icon type="edit" />
      </ButtonActionModal>
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
