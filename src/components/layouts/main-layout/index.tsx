import React, { Component } from 'react';
import { Layout } from 'antd';
import { Navigation } from './navigation';
import { StyledLayout, Header, ContainerContent } from './main-layout.css';
import logo from './../../../assets/logo.svg';
import { Logo } from './logo';
import { UserProfile } from './user-profile';

const { Sider, Content } = Layout;

export type TMainLayoutProps = {
  sidebar?: JSX.Element;
  matchUrl: string;
};

export class MainLayout extends Component<TMainLayoutProps> {
  render() {
    const { children, sidebar } = this.props;

    return (
      <StyledLayout>
        <Header>
          <Navigation />
          <Logo src={logo} />
          <UserProfile src="" name="Chris" />
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
