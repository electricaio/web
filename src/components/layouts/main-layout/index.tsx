import * as React from 'react';
import { Component } from 'react';
import { Layout } from 'antd';
import { Logo } from '../../../modules/components/main-layout/logo';
import { UserProfile } from '../../../modules/components/main-layout/user-profile';
import { Navigation } from '../../navigation';
import { Header, StyledLayout } from './main-layout.css';
import * as logo from './../../../assets/logo.svg';
import * as avatar from './../../../assets/matt-avatar.svg';

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
          <Logo src={logo} />
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
