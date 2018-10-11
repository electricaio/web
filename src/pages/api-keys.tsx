import * as React from 'react';
import { SFC } from 'react';
import { MainLayout } from './layout/layout-sidebar';
import { SidebarNavigation } from '../modules/api-keys/components/sidebar/sidebar';
import { ApiKeys } from '../modules/api-keys/components/api-keys/api-keys';

export const ApiKeysLayout: SFC = () => (
  <MainLayout sidebar={<SidebarNavigation />}>
    <ApiKeys />
  </MainLayout>
);
