import * as React from 'react';
import { SFC } from 'react';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayout } from '../components/layouts/main-layout';
import { StlSidebarNavigation } from '../modules/stl-hub/components/sidebar/sidebar';

export const StlHubLayout: SFC = () => (
  <MainLayout sidebar={<StlSidebarNavigation />}>
  </MainLayout>
);
