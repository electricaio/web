import React, { Component, Fragment } from 'react';

import { Form, Icon, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import { ForgotPassword } from './login.css';
import { StyledButton } from '../../components/button';
import { StyledInput } from '../../components/input';
import Header from '../../components/header';

const FormItem = Form.Item;

export type TLoginProps = {
  form: any;
};

class LoginForm extends Component<TLoginProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err: string, values: object) => {
      if (!err) {
        console.log('Received values of form: ', values);
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

export default Form.create()(LoginForm);
