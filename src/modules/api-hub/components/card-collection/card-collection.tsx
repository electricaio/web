import React, { SFC } from 'react';
import { Col, Row } from 'antd';

import chunk from 'lodash/chunk';

import { ConnectorCard } from './connector-card';
import { ConnectorModal } from '../../../../redux/api-hub/types';

export const COLUMN_CHUNK_COUNT = 3;

type TCardCollectionProps = {
  connectors: ConnectorModal[];
};

type TConnectorRowProps = {
  connectors: ConnectorModal[];
};

const ConnectorRow: SFC<TConnectorRowProps> = ({ connectors }) => {
  return (
    <Row gutter={16}>
      {connectors.map((connector: ConnectorModal) => (
        <Col span={24 / COLUMN_CHUNK_COUNT} key={connector.id}>
          <ConnectorCard connector={connector} />
        </Col>
      ))}
    </Row>
  );
};

export class CardCollection extends React.Component<TCardCollectionProps> {
  render() {
    const { connectors } = this.props;
    const connectorChunks = chunk(connectors, COLUMN_CHUNK_COUNT);
    return connectorChunks.map((connectorRow: ConnectorModal[], index: number) => (
      <ConnectorRow key={index} connectors={connectorRow} />
    ));
  }
}
