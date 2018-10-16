import { Form } from 'antd';

const Item = Form.Item;

import styled from 'styled-components';

export const Header = styled.div`
  text-align: center;
  margin: 40px 0;
`;

export const StyledFormItem = styled(Item as any)`
  text-transform: uppercase;
  .ant-form-explain {
    text-transform: none;
  }
`;

export const StyledForm = styled(Form as any)`
  width: 100%;
  padding: 0 40px;
`;
