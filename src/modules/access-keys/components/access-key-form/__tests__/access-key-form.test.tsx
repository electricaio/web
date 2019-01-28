import React from 'react';
import { mount } from 'enzyme';
import { AccessKeyForm } from '../access-key-form';

describe('AccessKeyForm', () => {
  beforeEach(() => {
    this.AccessKeyForm = mount(<AccessKeyForm />);
  });

  it('should have a name input', () => {
    const name = this.AccessKeyForm.find('input#name');
    expect(name).toHaveLength(1);
  });

  it('should use name and key as an initial value if passed', () => {
    const name = 'test name';
    const AccessKeyFormWithValues = mount(<AccessKeyForm name={name} />);
    const nameInputValue = AccessKeyFormWithValues.find('input#name').prop('value');
    expect(nameInputValue).toEqual(name);
  });
});
