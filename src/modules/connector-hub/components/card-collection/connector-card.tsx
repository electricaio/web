import React from 'react';
import { Col, Row, Tag } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { TConnectorEntity } from '../../../../models/ConnectorEntity';
import {
  CompanyImage,
  StyledMeta,
  ErnCol,
  ButtonContainer,
  ErnValue,
  NoKeys,
  StyledCard,
  ImageContainer,
} from './connector-card.css';

import { StyledButton } from '../../../ui-kit/button';

interface CompanyImageComponentProps {
  image: string;
}

const CompanyImageComponent: React.SFC<CompanyImageComponentProps> = ({ image }) => {
  return (
    <ImageContainer>
      <CompanyImage src={`../../../../assets/${image}`} />
    </ImageContainer>
  );
};

type ConnectorCardProps = {
  connector: TConnectorEntity;
};

export class ConnectorCard extends React.Component<ConnectorCardProps> {
  render() {
    const { connector } = this.props;
    return (
      <StyledCard
        hoverable
        title={connector.name}
        cover={<CompanyImageComponent image={connector.image} />}
        extra={<Tag color="green">{connector.type}</Tag>}
      >
        <StyledMeta description={connector.description} />
        <Row>
          <ErnCol span={4}>ERN</ErnCol>
          <Col span={8}>
            <ErnValue>{connector.ern}</ErnValue>
          </Col>
        </Row>
        <ButtonContainer>
          {isEmpty(connector.keys) ? (
            <NoKeys>There are no keys for this connector</NoKeys>
          ) : (
            <StyledButton icon="key" type="primary">
              View {connector.keys.length} keys
            </StyledButton>
          )}
        </ButtonContainer>
      </StyledCard>
    );
  }
}
