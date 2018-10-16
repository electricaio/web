import React, { Component, Fragment } from 'react';
import { Form, Icon } from 'antd';
import { Link } from 'react-router-dom';

import Header from '../../components/header';

import { StyledFormItem, StyledForm } from './signup.css';
import { StyledButton } from '../../components/button';
import { StyledInput } from '../../components/input';

export type TSignupProps = {
  form: any;
};

interface State {
  readonly confirmDirty: boolean;
}

class SignupForm extends Component<TSignupProps> {
  readonly state: State = {
    confirmDirty: false,
  };

  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err: string, values: object) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = (e: React.FormEvent) => {
    const { confirmDirty } = this.state;
    const { value } = e.target as HTMLInputElement;
    this.setState({ confirmDirty: confirmDirty || !!value });
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
