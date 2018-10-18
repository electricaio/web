import React, { SFC } from 'react';
import { Card, Affix, Row, Col } from 'antd';
import { ButtonItem } from './card.css';

const card = <Card bordered={false} style={{ width: 300, display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
  <Affix target={() => this.container} style={{ position: 'absolute', top: 20, left: 20 }}>
    <span style={{ backgroundColor: 'pink' }}>
      CRM
    </span>
  </Affix>
  <span style={{fontWeight: 'bold'}}>Salesforce Customer API 2.0</span>
  <img src="data:image/png;base64,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" />
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <span>ERN</span>
    <a>stl://salesforce:customer:2.0</a>
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <span>AUTH</span>
    <a>stl://salesforce:customer:2.0</a>
  </div>
  <Row>
    <Row>
      <Col span={10}>
        <ButtonItem type="primary">Dev-Joe</ButtonItem>
      </Col>
      <Col span={10} offset={2}>
        <ButtonItem type="primary">Dev-Joe</ButtonItem>
      </Col>
    </Row>
    <Row>
      <Col span={10}>
        <ButtonItem type="primary">Production</ButtonItem>
      </Col>
      <Col span={11} offset={2}>
        <ButtonItem type="primary">Test</ButtonItem>
      </Col>
    </Row>
  </Row>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
</Card>;

export const StlCard: SFC = () => (card);