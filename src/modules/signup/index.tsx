import React, { Component, Fragment, FormEvent } from 'react';
import { Form, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header';
import { StyledFormItem, StyledForm } from './signup.css';
import { StyledButton } from '../ui-kit/button';
import { StyledInput } from '../ui-kit/input';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { signupUser } from '../../redux/auth/actions';
// import { SignupParamsType } from '../../redux/auth/types';

interface PropsFromDispatch {
  signup: typeof signupUser;
}

export type TSignupProps = {
  form: WrappedFormUtils;
};

type TSignupFormState = {
  confirmDirty?: boolean;
};

type AllProps = TSignupProps & PropsFromDispatch & TSignupFormState;

class SignupForm extends Component<AllProps> {
  readonly state: TSignupFormState = {
    confirmDirty: false,
  };

  handleSubmit = (e: FormEvent) => {
    const { form, signup } = this.props;
    e.preventDefault();
    form.validateFields((err: string, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        signup({
          email: values.email,
          firstName: values.firstname,
          lastName: values.lastname,
          organizationId: 1,
          password: values.password,
        });
      }
    });
  };

  handleConfirmBlur = (e: FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    this.setState((prev: TSignupFormState) => ({
      confirmDirty: prev.confirmDirty || !!value,
    }));
  };

  compareToFirstPassword = (rule?: string, value?: string, callback?: Function) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you entered is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule?: string, value?: string, callback?: Function) => {
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
          <StyledFormItem label="Email">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your email address!',
                },
              ],
            })(
              <StyledInput
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
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

export const SignupFormComponent = Form.create()(SignupForm);
