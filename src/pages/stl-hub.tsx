import * as React from 'react';
import { SFC } from 'react';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayout } from '../components/layouts/main-layout';
import { StlSidebarNavigation } from '../modules/stl-hub/components/sidebar/sidebar';
import { StlPage } from '../modules/stl-hub/components/stl-hub/stl-hub';

export const StlHubLayout: SFC = () => (
  <MainLayout sidebar={<StlSidebarNavigation />}>
    <StlPage />
  </MainLayout>
);
