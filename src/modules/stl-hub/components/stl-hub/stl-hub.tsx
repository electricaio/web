import * as React from 'react';
import { SFC } from 'react';
import { match } from 'react-router';
import { MainLayout } from '../../../components/main-layout/main-layout';

type TStlHubProps = {
  match: match;
};

export const StlHub: SFC<TStlHubProps> = ({ match }) => (
  <MainLayout matchUrl={match.url} sidebar={<div>sidebar</div>}>
    <div>STL Hub Module</div>
  </MainLayout>
);
