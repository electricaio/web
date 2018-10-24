import React, { SFC } from 'react';
import { match } from 'react-router';
import { MainLayout } from '../../../../components/layouts/main-layout';

type TMonitorProps = {
  match: match;
};

export const Monitor: SFC<TMonitorProps> = ({ match }) => (
  <MainLayout sidebar={<div>sidebar</div>}>
    <div>Monitor Module</div>
  </MainLayout>
);
