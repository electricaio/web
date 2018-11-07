import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { LoginFormComponent } from '../login';
import { ApplicationState } from '../../../redux/store';
import { loginUser } from '../../../redux/auth/actions';
import { Spin, message } from 'antd';

const mapStateToProps = ({ login }: ApplicationState) => ({
  errors: login.errors,
  loading: login.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: bindActionCreators(loginUser, dispatch),
});

const showErrorMessage = () => {
  message.error('The username or password you entered is incorrect');
};

interface PropsFromState {
  loading: boolean;
  errors?: string;
}

interface PropsFromDispatch {
  login: typeof loginUser;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class LoginComponent extends Component<AllProps> {
  render() {
    const { errors, loading } = this.props;

    if (errors) {
      showErrorMessage();
    }
    return (
      <Spin spinning={loading} delay={0}>
        <LoginFormComponent login={this.props.login} />
      </Spin>
    );
  }
}

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
