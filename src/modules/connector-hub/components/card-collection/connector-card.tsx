import React from 'react';
import { Col, Row, Tag, Button } from 'antd';

import {
  CompanyImage,
  StyledMeta,
  ErnCol,
  ButtonContainer,
  ErnValue,
  StyledCard,
  ImageContainer,
} from './connector-card.css';

import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { TYPE_NAMES_DATA } from '../../../../fixtures/connector-type-data';

interface CompanyImageComponentProps {
  image: string;
}

const companyImageMockUrl: string = 'salesforce_logo_detail.png';

const CompanyImageComponent: React.SFC<CompanyImageComponentProps> = ({
  image,
}: CompanyImageComponentProps) => {
  return (
    <ImageContainer>
      <CompanyImage src={`../../../../assets/${image}`} />
    </ImageContainer>
  );
};

type ConnectorCardProps = {
  connector: ConnectorModal;
};

export class ConnectorCard extends React.Component<ConnectorCardProps> {
  render() {
    const { connector } = this.props;
    return (
      <StyledCard
        hoverable
        title={connector.name}
        cover={<CompanyImageComponent image={companyImageMockUrl} />}
        extra={<Tag color="green">{TYPE_NAMES_DATA.find(myObj => myObj.id === connector.typeId).name}</Tag>}
      >
        <StyledMeta description={connector.properties.description} />
        <Row>
          <ErnCol span={4}>ERN</ErnCol>
          <Col span={8}>
            <ErnValue>{connector.ern}</ErnValue>
          </Col>
        </Row>
        <ButtonContainer>
          <Button type="primary" size="large">Configure</Button>
        </ButtonContainer>
      </StyledCard>
    );
  }
}
