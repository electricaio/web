import React, { SFC } from 'react';
import { ApiKeysContainer } from '../modules/api-keys/containers/api-keys/api-keys.container';
import { MainLayout } from '../components/layouts/main-layout';

export const ApiKeysLayout: SFC = () => {
  return (
    <MainLayout>
      <ApiKeysContainer />
    </MainLayout>
  );
};
