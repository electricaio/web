import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from '../../../ui-kit/header';
import { ButtonActionModal } from '../../../ui-kit/modal-button-action/modal-button-action';
import { StyledButton } from '../../../ui-kit/button';
import { WebhooksTable } from '../table/table';
import { WebhookForm } from '../webhook-form/webhook-form';
import { WebhookModal } from '../../../../redux/webhooks/types';
import { WebhookComponent } from '../webhooks';
import { ConnectionModal } from '../../../../redux/connections/types';

describe('webhooks', () => {
  const webhooks: WebhookModal[] = [
    {
      name: 'Webhook Test',
      isPublic: false,
      connectionId: 1,
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      invokeUrl: 'webhook.com',
      publicInvokeUrl: null,
    },
  ];

  const connection: ConnectionModal = {
    name: 'Uber',
    accessKeyId: 1,
    connectorId: 1,
  };

  let createWebhookMock: jest.Mock;
  let deleteWebhookMock: jest.Mock;
  const createWebhookComponent = (): ShallowWrapper => {
    return shallow(
      <WebhookComponent
        connection={connection}
        webhooks={webhooks}
        deleteWebhook={deleteWebhookMock}
        createWebhook={createWebhookMock}
      />
    );
  };

  beforeEach(() => {
    createWebhookMock = jest.fn();
    deleteWebhookMock = jest.fn();
    this.component = createWebhookComponent();
  });

  it('renders a Header', () => {
    expect(this.component.find(Header)).toHaveLength(1);
  });

  it('renders table', () => {
    expect(this.component.find(WebhooksTable)).toHaveLength(1);
  });

  it('renders table with webhooks', () => {
    const table = this.component.find(WebhooksTable);
    expect(table.prop('webhooks')).toEqual(webhooks);
  });

  it('renders ButtonActionModal', () => {
    const buttonModal = this.component.find(ButtonActionModal);
    expect(buttonModal).toHaveLength(1);
  });

  it('passes a connections form to ButtonActionModal', () => {
    const buttonModal = this.component.find(ButtonActionModal);
    expect(buttonModal.prop('formComponent')).toEqual(<WebhookForm />);
  });

  it('renders primary button', () => {
    const btn = this.component.find(StyledButton);
    expect(btn).toHaveLength(1);
    expect(btn.prop('size')).toEqual('large');
  });

  it('passes handleCommit to ButtonActionModal', () => {
    const buttonModal = this.component.find(ButtonActionModal);
    expect(buttonModal.prop('onCommit')).toEqual(this.component.instance().handleCommit);
  });

  it('handleDelete calls deleteWebhooks with webhook id', () => {
    const connectionId = 100;
    (this.component.instance() as any).handleDelete(connectionId);
    expect(deleteWebhookMock).toBeCalledWith(connectionId);
  });
});
