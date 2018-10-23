import React, { SFC } from 'react';
import { match } from 'react-router';
import { MainLayout } from '../../../../components/layouts/main-layout';

type THomeProps = {
  match: match;
};

export const Home: SFC<THomeProps> = ({ match }) => (
  <MainLayout sidebar={<div>sidebar</div>}>
    <div>Home Module</div>
  </MainLayout>
);
