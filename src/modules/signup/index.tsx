import React, { Component, Fragment, FormEvent } from 'react';
import { Form, Icon } from 'antd';
import { Link } from 'react-router-dom';

import Header from '../../components/header';

import { StyledFormItem, StyledForm } from './signup.css';
import { StyledButton } from '../ui-kit/button';
import { StyledInput } from '../ui-kit/input';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export type TSignupProps = {
  form: WrappedFormUtils;
};

type TSignupFormState = {
  confirmDirty: boolean;
};

class SignupForm extends Component<TSignupProps, TSignupFormState> {
  readonly state: TSignupFormState = {
    confirmDirty: false,
  };

  handleSubmit = (e: FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err: string, values: object) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = (e: FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    this.setState((prev: TSignupFormState) => ({
      confirmDirty: prev.confirmDirty || !!value,
  }));
  };

  compareToFirstPassword = (rule?: any, value?: any, callback?: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you entered is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule?: any, value?: any, callback?: any) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Fragment>
        <Header title="Sign up">
          <p>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </Header>
        <StyledForm layout="vertical" onSubmit={this.handleSubmit}>
          <StyledFormItem label="User name">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input a Username!',
                },
              ],
            })(
              <StyledInput
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </StyledFormItem>
          <StyledFormItem label="First Name">
            {getFieldDecorator('firstname', {
              rules: [{ required: true, message: 'Please enter your first name' }],
            })(<StyledInput />)}
          </StyledFormItem>
          <StyledFormItem label="Last Name">
            {getFieldDecorator('lastname', {
              rules: [{ required: true, message: 'Please enter your last name' }],
            })(<StyledInput />)}
          </StyledFormItem>
          <StyledFormItem label="Company">
            {getFieldDecorator('company', {
              rules: [{ message: 'Your company' }],
            })(<StyledInput />)}
          </StyledFormItem>
          <StyledFormItem label="Password">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <StyledInput
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
              />
            )}
          </StyledFormItem>
          <StyledFormItem label="Confirm Password">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <StyledInput
                type="password"
                onBlur={this.handleConfirmBlur}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Confirm password"
              />
            )}
          </StyledFormItem>
          <StyledFormItem>
            <StyledButton block type="primary" htmlType="submit">
              Sign up
            </StyledButton>
          </StyledFormItem>
        </StyledForm>
      </Fragment>
    );
  }
}

export default Form.create()(SignupForm);
