import React from 'react';
import { Menu, Icon } from 'antd';
import { NavContainer, TextIcon } from './navigation.css';

function Nav({ items = [], mode = 'horizontal' }) {
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

export default Nav;
