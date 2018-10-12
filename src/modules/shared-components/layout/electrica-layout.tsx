import * as React from 'react';
import { Component } from 'react';
import { Layout } from 'antd';
import { NavigationText, StyledLink } from './electrica-layout.css';
import { Navigation } from '../navigation/index';
const { Header, Sider, Content } = Layout;

export type TElectriceLayoutProps = {
  sidebar: JSX.Element;
};

export class ElectricaLayout extends Component<TElectriceLayoutProps> {
  render() {
    const { children, sidebar } = this.props;

    return (
      <Layout className="layout">
        <Header>
          <div className="logo">electrica.io</div>
          <NavigationText>
            <Navigation items={headerNavigationItems()} />
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

export function headerNavigationItems() {
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
