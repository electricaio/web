import React, { Component } from 'react';
import { Layout } from 'antd';
import { Logo } from './logo';
import { UserProfile } from './user-profile';
import { Navigation } from '../../navigation/navigation';
import { Header, StyledLayout } from './main-layout.css';
import avatar from './../../../assets/matt-avatar.svg';

const { Sider, Content } = Layout;

export type TMainLayoutProps = {
  sidebar: JSX.Element;
  matchUrl: string;
};

export class MainLayout extends Component<TMainLayoutProps> {
  render() {
    const { children, sidebar, matchUrl } = this.props;

    return (
      <StyledLayout className="layout">
        <Header>
          <Logo />
          <Navigation matchUrl={matchUrl} />
          <UserProfile name={'Eric'} src={avatar} />
        </Header>
        <StyledLayout>
          <Sider>{sidebar}</Sider>
          <Content>{children}</Content>
        </StyledLayout>
      </StyledLayout>
    );
  }
}
