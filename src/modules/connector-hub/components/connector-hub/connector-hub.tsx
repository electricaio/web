import React, { Fragment } from 'react';
import { TConnectorEntity } from '../../../../models/ConnectorEntity';
import { CardCollection } from '../card-collection/card-collection';
import { Header } from '../header/header';
import { Row } from 'antd';

type ConnectorCardProps = {
  connectors: TConnectorEntity[];
};

export class ConnectorHub extends React.Component<ConnectorCardProps> {
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
