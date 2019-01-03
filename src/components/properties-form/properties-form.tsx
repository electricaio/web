import React, { Fragment } from 'react';
import { Icon, Tooltip, Input, Row, Col } from 'antd';
import { StyledButton } from '../../modules/ui-kit/button';

export type PropertiesProps = {
  onChange?: (properties: Properties[]) => void;
  value?: Properties[];
};

export type PropertiesState = {
  properties: Properties[];
};

export type Properties = {
  name: string;
  value: string;
};

export class PropertiesForm extends React.Component<PropertiesProps, PropertiesState> {
  constructor(props: PropertiesProps) {
    super(props);
    this.state = {
      properties: this.props.value || [{ name: '', value: '' }],
    };
  }

  handlePropertyChange = (idx: number, propertyKey: string) => (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProperties = this.state.properties.map((property, sidx) => {
      if (idx !== sidx) return property;
      return { ...property, [propertyKey]: evt.target.value };
    });

    this.props.onChange(newProperties);
    this.setState({ properties: newProperties });
  };

  componentWillUnmount() {
    this.setState({ properties: [{ name: '', value: '' }] });
  }

  handleAddProperty = () => {
    this.setState({ properties: this.state.properties.concat([{ name: '', value: '' }]) });
  };

  handleRemoveProperty = (idx: number) => () => {
    this.setState({ properties: this.state.properties.filter((_, sidx) => idx !== sidx) });
  };

  render() {
    return (
      <Fragment>
        {this.state.properties.map((shareholder: Properties, idx) => (
          <Row gutter={5}>
            <Col span={10}>
              <Input
                placeholder={`Property name ${idx + 1}`}
                value={shareholder.name}
                onChange={this.handlePropertyChange(idx, 'name')}
              />
            </Col>
            <Col span={10}>
              <Input
                placeholder={`Property value ${idx + 1}`}
                value={shareholder.value}
                onChange={this.handlePropertyChange(idx, 'value')}
              />
            </Col>
            <Col span={2}>
              <Tooltip placement="top" title="Remove">
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={this.handleRemoveProperty(idx)}
                />
              </Tooltip>
            </Col>
          </Row>
        ))}
        <StyledButton type="primary" onClick={this.handleAddProperty}>
          Add Property
        </StyledButton>
      </Fragment>
    );
  }
}
