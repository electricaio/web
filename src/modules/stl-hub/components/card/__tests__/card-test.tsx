import React, { SFC } from 'react';
import { shallow } from 'enzyme';

import { Row, Col } from 'antd';
import { CardItem, Title, Logo, KeyItem, RowItem, Description, ButtonItem } from '../card.css';
import StlCard from '../card';

describe('Card with Card Item', () => {
  const TestContentComponent: SFC = () => <div>content</div>;

  beforeEach(() => {
    this.stlCard = shallow(
      <StlCard>
        <TestContentComponent/>
      </StlCard>
    );
  });

  it('contains a card item', () => {
    expect(this.stlCard.find(CardItem)).toHaveLength(1);
  });

  it('contains a title of card', () => {
    expect(this.stlCard.find(CardItem).find(Title)).toHaveLength(1);
  });

  it('contains a logo of card', () => {
    expect(this.stlCard.find(CardItem).find(Logo)).toHaveLength(1);
  });

  it('contains ern and auth of card', () => {
    expect(this.stlCard.find(CardItem).find(KeyItem)).toHaveLength(2);
  });

  it('contains a button Row container', () => {
    expect(this.stlCard.find(CardItem).find(Row)).toHaveLength(1);
  });

  it('contains two button Row item inside Row container', () => {
    expect(this.stlCard.find(CardItem).find(Row).find(RowItem)).toHaveLength(2);
  });

  it('contains four buttons inside Row container', () =>{
    expect(this.stlCard.find(CardItem).find(Row).find(RowItem).find(ButtonItem)).toHaveLength(4);
  });

  it('contains a Description', () => {
    expect(this.stlCard.find(CardItem).find(Description)).toHaveLength(1);
  });
});