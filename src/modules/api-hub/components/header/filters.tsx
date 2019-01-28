import * as React from 'react';
import { Switch, Icon, Form } from 'antd';
import { ButtonContainer, Container } from './filters.css';
import { StyledButton } from '../../../ui-kit/button';

const FormItem = Form.Item;

type TFilterProps = {};

export class ConnectorFilters extends React.Component<TFilterProps, any> {
  public render() {
    return (
      <Container>
        <Form layout="inline">
          <FormItem label="Active APIs">
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked
            />
          </FormItem>
        </Form>
        <ButtonContainer>
          <StyledButton type="primary" icon="plus">
            Create SDK
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}
