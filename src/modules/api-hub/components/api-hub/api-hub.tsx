import React, { Fragment } from 'react';
import { CardCollection } from '../card-collection/card-collection';
import { Header } from '../header/header';
import { Row } from 'antd';
import { ConnectorModal } from '../../../../redux/api-hub/types';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  connectors: ConnectorModal[];
}

export class APIHubComponent extends React.Component<PropsFromState> {
  render() {
    const { connectors } = this.props;
    return (
      <Fragment>
        <Row>
          <Header />
        </Row>
        <Row>
          <CardCollection connectors={connectors} />
        </Row>
      </Fragment>
    );
  }
}
