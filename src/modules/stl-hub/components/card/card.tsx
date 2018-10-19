import React, { SFC } from 'react';
import { Affix, Row, Col } from 'antd';
import { ButtonItem, CardItem, TypeItem, Logo, Title, KeyItem, RowItem, Description } from './card.css';

const card = <CardItem bordered={false}>
  <Affix target={() => this.container} style={{ position: 'absolute', top: 0, left: 0 }}>
    <TypeItem color='red'>CRM</TypeItem>
  </Affix>
  <Title>Salesforce Customer API 2.0</Title>
  <Logo src='salesforce' />
  <KeyItem>
    <span>ERN</span>
    <a>stl://salesforce:customer:2.0</a>
  </KeyItem>
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <span>AUTH</span>
    <a>stl://salesforce:customer:2.0</a>
  </div>
  <Row>
    <RowItem gutter={16}>
      <Col span={12}>
        <ButtonItem type="primary">Dev-Joe</ButtonItem>
      </Col>
      <Col span={12}>
        <ButtonItem type="primary">Dev-Joe</ButtonItem>
      </Col>
    </RowItem>
    <RowItem gutter={16}>
      <Col span={12}>
        <ButtonItem type="primary">Production</ButtonItem>
      </Col>
      <Col span={12}>
        <ButtonItem type="primary">Test</ButtonItem>
      </Col>
    </RowItem>
  </Row>
  <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Description>
</CardItem>;

export const StlCard: SFC = () => (card);