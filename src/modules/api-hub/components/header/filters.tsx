import * as React from 'react';
import { Menu, Switch, Icon, Checkbox, Form } from 'antd';
import { ButtonContainer, Container } from './filters.css';
import { DropdownComponent } from '../../../ui-kit/dropdown';
import { StyledButton } from '../../../ui-kit/button';

const FormItem = Form.Item;

type TFilterProps = {};

export class ConnectorFilters extends React.Component<TFilterProps, any> {
  public render() {
    return (
      <Container>
        <Form layout="inline">
          <FormItem label="Only show active APIs">
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked
            />
          </FormItem>
          <FormItem>
            <DropdownComponent label="Filter by API" keepMenuOpen>
              <Menu.Item key="1">
                <Checkbox>Talent</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Foundation</Checkbox>
              </Menu.Item>
            </DropdownComponent>
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
