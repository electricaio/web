import React from 'react';
import { Col, Row, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import java from '../../../../assets/languages/java.png';
import javascript from '../../../../assets/languages/javascript.png';
import ruby from '../../../../assets/languages/ruby.png';

import {
  CompanyImage,
  StyledMeta,
  ErnCol,
  ButtonContainer,
  ErnValue,
  StyledCard,
  ImageContainer,
  LanguageImage,
} from './connector-card.css';

import { ConnectorModal } from '../../../../redux/api-hub/types';

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
    const { description = '' } = connector.properties || {};
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
        bodyStyle={{ paddingTop: '0px' }}
      >
        <StyledMeta description={description} />
        <Row type="flex" justify="start" align="middle">
          <ErnCol span={8}>ERN</ErnCol>
          <Col span={16}>
            <ErnValue>{connector.ern}</ErnValue>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }} type="flex" justify="start" align="middle">
          <ErnCol span={8}>Languages</ErnCol>
          <Col span={3}>
            <LanguageImage src={java} />
          </Col>
          <Col span={4}>
            <LanguageImage src={javascript} />
          </Col>
          <Col span={4}>
            <LanguageImage src={ruby} />
          </Col>
        </Row>
        <ButtonContainer>
          <Button type="primary" size="large">
            <Link to={`/api-hub/${connector.id}`}>Configure</Link>
          </Button>
        </ButtonContainer>
      </StyledCard>
    );
  }
}
