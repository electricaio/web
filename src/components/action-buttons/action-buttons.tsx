import React, { SFC, Fragment, ReactElement } from 'react';
import { DeleteIcon } from './action-buttons.css';
import { Icon, Popconfirm, Tooltip } from 'antd';
import { ButtonActionModal } from '../../modules/ui-kit/modal-button-action/modal-button-action';
export type ActionButtonsProps = {
  onRemove: () => void;
  onEdit?: (formValues: any) => void;
  editForm?: ReactElement<any>;
  name: string;
  typeName: string;
};

export const ActionButtons: SFC<ActionButtonsProps> = ({
  name,
  onEdit,
  editForm,
  onRemove,
  typeName,
}) => (
  <Fragment>
    {onEdit && (
      <ButtonActionModal
        onCommit={onEdit}
        formComponent={editForm}
        submitText="Update"
        title={`Edit ${typeName}`}
      >
        <Tooltip placement="top" title={`Edit ${typeName}`}>
          <Icon type="edit" />
        </Tooltip>
      </ButtonActionModal>
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
