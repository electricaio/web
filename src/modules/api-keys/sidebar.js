import React from 'react';
import Navigation from '../../components/navigation';

import { NavItem } from './sidebar.css';

export default function SidebarNavigation() {
  const items = [
    {
      action: <NavItem>Keys</NavItem>,
      icon: 'key',
    },
    {
      action: <NavItem>Generate new key</NavItem>,
      icon: 'plus',
    },
  ];
  return <Navigation mode="vertical" items={items} />;
}
