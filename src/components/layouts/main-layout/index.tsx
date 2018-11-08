import React, { Component } from 'react';
import { Layout } from 'antd';
import { Navigation } from './navigation';
import { StyledLayout, Header, ContainerContent } from './main-layout.css';
import logo from './../../../assets/logo.svg';
import { Logo } from './logo';
import { UserProfileContainer } from './user-profile';

const { Sider, Content } = Layout;

export type TMainLayoutProps = {
  sidebar?: JSX.Element;
};

export class MainLayout extends Component<TMainLayoutProps> {
  render() {
    const { children, sidebar } = this.props;

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
              {sidebar && <Sider width={300}>{sidebar}</Sider>}
              <Content>{children}</Content>
            </Layout>
          </StyledLayout>
        </ContainerContent>
      </StyledLayout>
    );
  }
}
