import React from 'react';
import { mount } from 'enzyme';
import { ApiKeyForm } from '../api-key-form';

describe('ApiKeyForm', () => {
  beforeEach(() => {
    this.apiKeyForm = mount(<ApiKeyForm />);
  });

  it('should have a name input', () => {
    const name = this.apiKeyForm.find('input#apiKeyName');
    expect(name).toHaveLength(1);
  });

  it('should have a generate key input', () => {
    const keyInput = this.apiKeyForm.find('input#apiKey');
    expect(keyInput).toHaveLength(1);
  });

  it('should use name and key as an initial value if passed', () => {
    const name = 'test name';
    const apiKeyFormWithValues = mount(<ApiKeyForm apiKeyName={name} />);
    const nameInputValue = apiKeyFormWithValues.find('input#apiKeyName').prop('value');
    expect(nameInputValue).toEqual(name);
  });
});
