import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { SignupFormComponent } from '../index';
import { Header } from '../../../components/header';

describe('Signup', () => {
  beforeEach(() => {
    this.signupComponent = mount(
      <MemoryRouter>
        <SignupFormComponent />
      </MemoryRouter>
    );
  });

  it('should contain a header with a title', () => {
    const header = this.signupComponent.find(Header);
    expect(header.prop('title')).toBeTruthy();
  });

  it('should contain sign ups', () => {
    const components = ['email', 'firstname', 'lastname', 'company', 'password', 'confirm'];
    components.forEach(name => {
      const comp = this.signupComponent.find(`input#${name}`);
      expect(comp).toHaveLength(1);
    });
  });

  it('should not show validation error alert when required components have values', () => {
    const components = ['email', 'firstname', 'lastname', 'password', 'confirm'];
    components.forEach(componentName => {
      const component = this.signupComponent.find(`input#${componentName}`);
      component.simulate('change', { target: { value: 'testing' } });
    });
    const form = this.signupComponent.find(Form);
    form.simulate('submit');
    const validations = this.signupComponent.find('.ant-form-explain');
    expect(validations).toHaveLength(0);
  });

  it('should fail validation if the passwords do not match', () => {
    const password = this.signupComponent.find('input#password');
    const passwordConfirm = this.signupComponent.find('input#confirm');

    password.simulate('change', { target: { value: 'password' } });
    passwordConfirm.simulate('change', { target: { value: 'wrong' } });

    const form = this.signupComponent.find(Form);
    form.simulate('submit');
    const validations = this.signupComponent.find('.ant-form-explain');
    expect(
      validations.findWhere(
        (value: any) => value.text() === 'Two passwords that you entered is inconsistent!'
      )
    ).toHaveLength(1);
  });
});
