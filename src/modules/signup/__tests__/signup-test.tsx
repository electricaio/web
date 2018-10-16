import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'antd';
import { MemoryRouter } from 'react-router-dom';

import Signup from '../index';
import Header from '../../../components/header';

describe('Signup', () => {
  let signupComponent: any;

  beforeEach(() => {
    signupComponent = mount(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
  });

  it('should contain a header with a title', () => {
    const header = signupComponent.find(Header);
    expect(header.prop('title')).toBeTruthy();
  });

  it('should contain sign ups', () => {
    const components = ['email', 'firstname', 'lastname', 'company', 'password', 'confirm'];
    components.forEach((name) => {
      const comp = signupComponent.find(`input#${name}`);
      expect(comp).toHaveLength(1);
    });
  });

  it('should not show validation error alert when required components have values', () => {
    const components = ['email', 'firstname', 'lastname', 'password', 'confirm'];
    components.forEach((componentName) => {
      const component = signupComponent.find(`input#${componentName}`);
      component.simulate('change', { target: { value: 'testing' } });
    });
    const form = signupComponent.find(Form);
    form.simulate('submit');
    const validations = signupComponent.find('.ant-form-explain');
    expect(validations).toHaveLength(0);
  });

  it('should fail validation if the passwords do not match', () => {
    const password = signupComponent.find('input#password');
    const passwordConfirm = signupComponent.find('input#confirm');

    password.simulate('change', { target: { value: 'password' } });
    passwordConfirm.simulate('change', { target: { value: 'wrong' } });

    const form = signupComponent.find(Form);
    form.simulate('submit');
    const validations = signupComponent.find('.ant-form-explain');
    expect(
      validations.findWhere(
        (value: any) => value.text() === 'Two passwords that you entered is inconsistent!'
      )
    ).toHaveLength(1);
  });
});
