import React, { Fragment, Component } from 'react';
import { Header } from '../../ui-kit/header';
import { ButtonActionModal } from '../../ui-kit/modal-button-action/modal-button-action';
import { StyledButton } from '../../ui-kit/button';
import { createWebhook, deleteWebhook } from '../../../redux/webhooks/async';
import { WebhookForm } from './webhook-form/webhook-form';
import { WebhooksTable } from './table/table';
import { WebhookModal, WebhookModalRequest } from '../../../redux/webhooks/types';
import { ConnectionModal } from '../../../redux/connections/types';

interface PropsFromState {
  webhooks: WebhookModal[];
  connection: ConnectionModal;
  createWebhook: typeof createWebhook;
  deleteWebhook: typeof deleteWebhook;
}

export class WebhookComponent extends Component<PropsFromState> {
  handleDelete = (webhookId: number) => {
    const { deleteWebhook } = this.props;
    deleteWebhook(webhookId);
  };

  handleCommit = (formValues: any) => {
    const { connection, createWebhook } = this.props;
    const newWebhook: WebhookModalRequest = {
      isPublic: formValues.isPublic,
      connectionId: connection.id,
      name: formValues.name,
      accessKeyId: connection.accessKeyId,
    };

    createWebhook(newWebhook);
  };

  render() {
    const { webhooks } = this.props;

    return (
      <Fragment>
        <Header>Webhooks let you easily develop push events to Electrica</Header>
        <WebhooksTable onRemove={this.handleDelete} webhooks={webhooks} />
        <ButtonActionModal
          title="Create a new webhook"
          submitText="Create"
          onCommit={this.handleCommit}
          formComponent={<WebhookForm />}
        >
          <StyledButton type="primary" size="large">
            Add Webhook
          </StyledButton>
        </ButtonActionModal>
      </Fragment>
    );
  }
}
