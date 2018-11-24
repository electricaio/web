import React, { SFC } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import { StyledBreadcrumb } from './breadcrumb.css';

type Props = {
  breadcrumbNameMap: { [index: string]: string };
};

type AllProps = Props & RouteComponentProps;

export const BreadcrumbNavigation: SFC<AllProps> = props => {
  const { location, breadcrumbNameMap } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">
        <Icon type="home" />
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <StyledBreadcrumb>{breadcrumbItems}</StyledBreadcrumb>;
};

export const BreadcrumbComponent = withRouter(BreadcrumbNavigation);
