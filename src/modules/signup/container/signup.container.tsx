import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { SignupFormComponent } from '../';
import { ApplicationState } from '../../../redux/store';
import { signupUser } from '../../../redux/auth/actions';
import { Spin, message } from 'antd';

const mapStateToProps = ({ auth }: ApplicationState) => ({
  errors: auth.errors,
  loading: auth.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signup: bindActionCreators(signupUser, dispatch),
});

const showErrorMessage = (errors: string) => {
  message.error(`Your signup failed ${errors}`);
};

export interface PropsFromState {
  loading: boolean;
  errors?: string;
}

export interface PropsFromDispatch {
  signup: typeof signupUser;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class SignupComponent extends Component<AllProps> {
  render() {
    const { errors, loading } = this.props;

    if (errors) {
      showErrorMessage(errors);
    }
    return (
      <Spin spinning={loading} delay={0}>
        <SignupFormComponent signup={this.props.signup} />
      </Spin>
    );
  }
}

export const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupComponent);
