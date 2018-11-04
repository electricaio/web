import React, { Fragment } from 'react';
import { CardCollection } from '../card-collection/card-collection';
import { Header } from '../header/header';
import { Row } from 'antd';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { fetchConnectors } from '../../../../redux/connector-hub/actions';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  connectors: ConnectorModal[];
}

interface PropsFromDispatch {
  fetchConnectors: typeof fetchConnectors;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class ConnectorHub extends React.Component<AllProps> {
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
