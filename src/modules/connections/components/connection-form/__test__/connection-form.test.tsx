import React from 'react';
import { mount } from 'enzyme';
import { ConnectionForm } from '../connection-form';

describe('ConnectionForm', () => {
  beforeEach(() => {
    this.connectionForm = mount(<ConnectionForm />);
  });

  it('should have a name input', () => {
    const name = this.connectionForm.find('input#connectionName');
    expect(name).toHaveLength(1);
  });

  it('should use name and key as an initial value if passed', () => {
    const name = 'test name';
    const connectionFormWithValues = mount(<ConnectionForm connectionName={name} />);
    const nameInputValue = connectionFormWithValues.find('input#connectionName').prop('value');
    expect(nameInputValue).toEqual(name);
  });
});
