import React, { SFC, Fragment } from 'react';
import { DeleteIcon } from './action-buttons.css';
import { Icon, Popconfirm, Tooltip } from 'antd';
export type ActionButtonsProps = {
  onRemove: () => void;
  onEdit?: () => void;
  name: string;
  typeName: string;
};

export const ActionButtons: SFC<ActionButtonsProps> = ({ name, onEdit, onRemove, typeName }) => (
  <Fragment>
    {onEdit && (
      <Tooltip placement="top" title="Edit Connection">
        <Icon type="edit" onClick={onEdit} />
      </Tooltip>
    )}

    <Tooltip placement="top" title={`Delete ${typeName}`}>
      <Popconfirm
        icon={<DeleteIcon type="question-circle-o" />}
        placement="top"
        title={`Delete ${name} ${typeName}?`}
        onConfirm={onRemove}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="delete" />
      </Popconfirm>
    </Tooltip>
  </Fragment>
);
