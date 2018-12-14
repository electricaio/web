import React, { Component } from 'react';
import { Layout, notification } from 'antd';

import { Navigation } from './navigation';
import { StyledLayout, Header, ContainerContent } from './main-layout.css';
import logo from './../../../assets/logo.svg';
import { Logo } from './logo';
import { UserProfileContainer } from './user-profile';
import { UserDto } from '../../../redux/auth/types';
import { ApplicationState } from '../../../redux/store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../../../redux/auth/async';
import { AsyncComponent } from '../../async-component/async-component';

const { Content } = Layout;

// Separate state props + dispatch props to their own interfaces.
type PropsFromState = {
  user: UserDto;
  errorMessage: string;
};

type PropsFromDispatch = {
  fetchUser: typeof fetchUser;
};

type TMainLayoutProps = {
  children: JSX.Element;
};

const mapStateToProps = ({ auth, error }: ApplicationState) => ({
  user: auth.user,
  errorMessage: error.message,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser: bindActionCreators(fetchUser, dispatch),
});

const errorNotification = (message: string) => {
  notification.error({
    message: 'There was a problem',
    description: message,
    onClose: () => {
      console.log('CLOSED!!!');
    },
  });
};

type AllProps = PropsFromState & PropsFromDispatch & TMainLayoutProps;

export class MainLayout extends Component<AllProps> {
  render() {
    const { errorMessage, fetchUser, children } = this.props;

    if (errorMessage) {
      errorNotification(errorMessage);
    }
    return (
      <AsyncComponent showError={false} message="" getAsyncActions={() => [fetchUser()]}>
        <StyledLayout>
          <Header>
            <Navigation />
            <Logo src={logo} />
            <UserProfileContainer />
          </Header>
          <ContainerContent>
            <StyledLayout>
              <Layout>
                <Content>{children}</Content>
              </Layout>
            </StyledLayout>
          </ContainerContent>
        </StyledLayout>
      </AsyncComponent>
    );
  }
}

export const MainLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
