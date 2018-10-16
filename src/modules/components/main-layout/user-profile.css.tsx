import { Icon } from 'antd';
import styled from 'styled-components';

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.div`
  display: flex;
  justify-content: center;
  color: #f8f8f9;
  margin-right: 10px;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 20px;
  border: 2px solid #ebeced;
  margin-right: 5px;
`;

export const StyledIcon = styled(Icon)`
  color: #fff;
`;
