import * as React from 'react';
import { SFC } from 'react';
import { match } from 'react-router';
import { MainLayout } from '../../../components/main-layout/main-layout';

type TMonitorProps = {
  match: match;
};

export const Monitor: SFC<TMonitorProps> = ({ match }) => (
  <MainLayout matchUrl={match.url} sidebar={<div>sidebar</div>}>
    <div>Monitor Module</div>
  </MainLayout>
);
