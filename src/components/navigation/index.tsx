import * as React from 'react';
import { Menu, Icon } from 'antd';
import { NavContainer, TextIcon } from './navigation.css';
import { MenuMode } from 'antd/lib/menu';
import { Component } from 'react';

export type TItem = {
  action: JSX.Element | string;
  icon?: string;
};

export type TNavProps = {
  items: TItem[];
  mode?: MenuMode;
};

export class Navigation extends Component<TNavProps> {
  render() {
    const { items, mode = 'horizontal' } = this.props;

    return (
      <NavContainer mode={mode} style={{ lineHeight: '64px' }}>
        {items.map((item, index) => (
          <Menu.Item key={index}>
            <TextIcon>
              {item.icon && <Icon type={item.icon} />} {item.action}
            </TextIcon>
          </Menu.Item>
        ))}
      </NavContainer>
    );
  }
}
