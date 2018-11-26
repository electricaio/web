import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
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

const { Content } = Layout;

// Separate state props + dispatch props to their own interfaces.
type PropsFromState = {
  user: UserDto;
};

type PropsFromDispatch = {
  fetchUserDetails: typeof fetchUser;
};

type TMainLayoutProps = {
  children: JSX.Element;
};

const mapStateToProps = ({ auth }: ApplicationState) => ({
  user: auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserDetails: bindActionCreators(fetchUser, dispatch),
});

type AllProps = PropsFromState & PropsFromDispatch & TMainLayoutProps;

export class MainLayout extends Component<AllProps> {
  componentDidMount = () => {
    const { fetchUserDetails } = this.props;
    fetchUserDetails();
  };

  render() {
    const { children } = this.props;
    const isLoadingUser = this.props.user === undefined;

    return (
      <StyledLayout>
        <Header>
          <Navigation />
          <Logo src={logo} />
          <UserProfileContainer />
        </Header>
        <ContainerContent>
          <StyledLayout>
            <Layout>
              <Content>{isLoadingUser ? <Spin spinning={isLoadingUser} /> : children}</Content>
            </Layout>
          </StyledLayout>
        </ContainerContent>
      </StyledLayout>
    );
  }
}

export const MainLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainLayout);
