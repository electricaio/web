import React from 'react';
import { mount } from 'enzyme';
import { WebhookForm } from '../webhook-form';

describe('WebhookForm', () => {
  beforeEach(() => {
    this.webhookForm = mount(<WebhookForm />);
  });

  it('should have a name input', () => {
    const name = this.webhookForm.find('input#name');
    expect(name).toHaveLength(1);
  });
});
