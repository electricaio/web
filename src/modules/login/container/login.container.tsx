import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { LoginFormComponent } from '../login';
import { ApplicationState } from '../../../redux/store';
import { loginUser, fetchUser } from '../../../redux/auth/actions';
import { Spin, message } from 'antd';

const mapStateToProps = ({ auth }: ApplicationState) => ({
  errors: auth.errors,
  loading: auth.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: bindActionCreators(loginUser, dispatch),
  fetchUserDetails: bindActionCreators(fetchUser, dispatch),
});

const showErrorMessage = () => {
  message.error('The username or password you entered is incorrect');
};

export interface PropsFromState {
  loading: boolean;
  errors?: string;
}

export interface PropsFromDispatch {
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
