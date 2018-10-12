import * as React from 'react';
import { SFC } from 'react';
import { ElectricaLayout } from '../modules/shared-components/layout/electrica-layout';
import { SidebarNavigation } from '../modules/api-keys/components/sidebar/sidebar';
import { ApiKeys } from '../modules/api-keys/components/api-keys/api-keys';

export const ApiKeysLayout: SFC = () => (
  <ElectricaLayout sidebar={<SidebarNavigation />}>
    <ApiKeys />
  </ElectricaLayout>
);
