import * as React from 'react';
import { SFC } from 'react';
import { MainLayout } from '../modules/shared-components/main-layout/main-layout';
import { SidebarNavigation } from '../modules/api-keys/components/sidebar/sidebar';
import { ApiKeys } from '../modules/api-keys/components/api-keys/api-keys';

export const ApiKeysLayout: SFC = () => (
  <MainLayout sidebar={<SidebarNavigation />}>
    <ApiKeys />
  </MainLayout>
);
