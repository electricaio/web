import * as React from 'react';
import { SFC } from 'react';
import { CheckboxItem, SwitchItem } from './sidebar.css';
import { Menu, Dropdown, Icon } from 'antd';
import { Navigation } from '../../../../components/navigation';

const onActiveToggle =  (checked: any) => {
  console.log(`switch to ${checked}`);
};

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
  {
    action: <SwitchItem defaultChecked onChange={onActiveToggle} />,
  },
];

export const StlSidebarNavigation: SFC = () => <Navigation mode="vertical" items={items} />;