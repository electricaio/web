import React, { Component, Fragment } from 'react';
import { Form, Icon, Checkbox } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Link } from 'react-router-dom';
import { ForgotPassword } from './login.css';
import { StyledButton } from '../ui-kit/button';
import { StyledInput } from '../ui-kit/input';
import { Header } from '../../components/header';
import { loginUser } from '../../redux/auth/actions';

const FormItem = Form.Item;

interface PropsFromDispatch {
  login: typeof loginUser;
}

export type TLoginProps = {
  form: WrappedFormUtils;
};

type AllProps = PropsFromDispatch & TLoginProps;

class LoginForm extends Component<AllProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { form, login } = this.props;
    e.preventDefault();
    form.validateFields(async (err: string, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        await login(values.username, values.password);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Fragment>
        <Header title="Sign in to Electrica" />
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input a username!' }],
            })(
              <StyledInput
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <StyledInput
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <ForgotPassword>
              <Link to="/forgot" />
            </ForgotPassword>
            <StyledButton type="primary" htmlType="submit" block>
              Log in
            </StyledButton>
            Or <Link to="/signup">register now!</Link>
          </FormItem>
        </Form>
      </Fragment>
    );
  }
}

export const LoginFormComponent = Form.create()(LoginForm);
