import React from 'react';
import { mount } from 'enzyme';
import { Tooltip } from 'antd';
import { GenerateNewKey, ApiKeyForm } from '../api-key-form';
import { GenerateButton } from '../api-key-form.css';

describe('ApiKeyForm', () => {
  beforeEach(() => {
    this.apiKeyForm = mount(<ApiKeyForm />);
  });

  it('should have a name input', () => {
    const name = this.apiKeyForm.find('input#name');
    expect(name).toHaveLength(1);
  });

  it('should have a generate key input', () => {
    const keyInput = this.apiKeyForm.find('input#apiKey');
    expect(keyInput).toHaveLength(1);
  });

  it('should render `GenerateNewKey` component', () => {
    const key = this.apiKeyForm.find(GenerateNewKey);
    expect(key).toHaveLength(1);
  });

  describe('GenerateNewKey', () => {
    beforeEach(() => {
      this.newKeyButton = this.apiKeyForm.find(GenerateNewKey);
    });

    it('should have a Tooltip', () => {
      const tooltip = this.newKeyButton.find(Tooltip);
      expect(tooltip.prop('title')).toBeTruthy();
      expect(tooltip.prop('placement')).toEqual('left');
      expect(tooltip).toHaveLength(1);
    });

    it('should have a button to generate a key', () => {
      const generateBtn = this.newKeyButton.find(GenerateButton);
      expect(generateBtn).toHaveLength(1);
      expect(generateBtn.prop('type')).toEqual('primary');
      expect(generateBtn.prop('shape')).toEqual('circle');
      expect(generateBtn.prop('icon')).toEqual('sync');
    });
  });
});
