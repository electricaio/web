import React, { Component } from 'react';
import { Menu } from 'antd';
import { StyledLink, NavContainer } from './navigation.css';
import { MenuMode } from 'antd/lib/menu';

export type TItem = {
  action: JSX.Element | string;
  icon?: string;
};

export type TNavProps = {
  mode?: MenuMode;
};

export class Navigation extends Component<TNavProps> {
  items() {
    return [
      {
        action: <StyledLink to="/">home</StyledLink>,
      },
      {
        action: <StyledLink to="/api-keys">api keys</StyledLink>,
      },
      {
        action: <StyledLink to="/connector-hub">connector hub</StyledLink>,
      },
    ];
  }
  render() {
    const { mode = 'horizontal' } = this.props;

    return (
      <NavContainer mode={mode}>
        {this.items().map((item, index) => (
          <Menu.Item key={index}>{item.action}</Menu.Item>
        ))}
      </NavContainer>
    );
  }
}
