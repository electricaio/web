import * as React from 'react';
import { SFC } from 'react';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayout } from '../modules/shared-components/main-layout/main-layout';
import { SidebarNavigation } from '../modules/api-keys/components/sidebar/sidebar';

export const ApiKeysLayout: SFC = () => (
  <MainLayout sidebar={<SidebarNavigation />}>
    <ApiKeysContainer />
  </MainLayout>
);
