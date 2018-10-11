import * as React from 'react';
import { SFC } from 'react';
import { Navigation } from '../../../../components/navigation';
import { NavItem } from './theme/sidebar.css';

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

export const SidebarNavigation: SFC = () => <Navigation mode="vertical" items={items} />;
