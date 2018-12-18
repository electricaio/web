import React from 'react';
import { Col, Row, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';

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

interface CompanyImageComponentProps {
  image: string;
}

interface TypeModel {
  id: number;
  name: string;
}
export const TYPE_NAMES_DATA: TypeModel[] = [
  { id: 1, name: 'Foundation' },
  { id: 2, name: 'CRM' },
  { id: 3, name: 'Talent' },
];

export const CompanyImageComponent: React.SFC<CompanyImageComponentProps> = ({
  image,
}: CompanyImageComponentProps) => {
  return (
    <ImageContainer>
      <CompanyImage src={image} />
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
        cover={<CompanyImageComponent image={connector.imageUrl} />}
        extra={
          <Tag color="green">
            {TYPE_NAMES_DATA.find(myObj => myObj.id === connector.typeId).name}
          </Tag>
        }
      >
        <StyledMeta description={connector.properties.description} />
        <Row>
          <ErnCol span={4}>ERN</ErnCol>
          <Col span={8}>
            <ErnValue>{connector.ern}</ErnValue>
          </Col>
        </Row>
        <ButtonContainer>
          <Button type="primary" size="large">
            <Link to={`/connector-hub/${connector.id}`}>Configure</Link>
          </Button>
        </ButtonContainer>
      </StyledCard>
    );
  }
}
