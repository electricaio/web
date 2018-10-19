import * as React from 'react';
import { SFC } from 'react';
import { Navigation } from '../../../../components/navigation';
import { CheckboxItem } from './sidebar.css';
import { Menu, Dropdown, Icon } from 'antd';

const menu = <Menu>
  <Menu.Item key="1">Credit Card</Menu.Item>
  <Menu.Item key="2">Paypal</Menu.Item>
  <Menu.Item key="3">Stripe</Menu.Item>
</Menu>;

const items = [
  {
    action: <CheckboxItem>All</CheckboxItem>,
  },
  {
    action: <CheckboxItem>Foundation</CheckboxItem>,
  },
  {
    action: <CheckboxItem>Payment</CheckboxItem>,
  },
  {
    action: <CheckboxItem>CRM</CheckboxItem>,
  },
  {
    action: <CheckboxItem>Support</CheckboxItem>,
  },
];

export const StlSidebarNavigation: SFC = () => <Navigation mode="vertical" items={items} />;