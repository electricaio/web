import React, { Component } from 'react';
import { Layout } from 'antd';

import Navigation from '../../components/navigation';

import { NavigationText, StyledLink } from './layout-sidebar.css';

const { Header, Sider, Content } = Layout;

export default class MainLayout extends Component {
  headerNavigationItems() {
    return [
      {
        action: <StyledLink to="/">home</StyledLink>,
      },
      {
        action: <StyledLink to="/api-keys">api keys</StyledLink>,
      },
      {
        action: <StyledLink to="/stl-hub">stl hub</StyledLink>,
      },
      {
        action: <StyledLink to="/monitor">monitor</StyledLink>,
      },
      {
        action: <StyledLink to="/notification">notification</StyledLink>,
      },
    ];
  }

  render() {
    const { children, sidebar } = this.props;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">electrica.io</div>
          <NavigationText>
            <Navigation items={this.headerNavigationItems()} />
          </NavigationText>
        </Header>
        <Layout>
          <Sider>{sidebar}</Sider>

          <Content>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}
