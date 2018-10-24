import React, { SFC } from 'react';
import { match } from 'react-router';
import { MainLayout } from '../../../../components/layouts/main-layout';

type TNotificationsProps = {
  match: match;
};

export const Notifications: SFC<TNotificationsProps> = ({ match }) => (
  <MainLayout sidebar={<div>sidebar</div>}>
    <div>Notifications Module</div>
  </MainLayout>
);
