import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { AccessKeyModal } from '../../../redux/access-keys/types';
import { ConnectorModal } from '../../../redux/api-hub/types';
import { fetchKeys } from '../../../redux/access-keys/async';
import { fetchConnectors } from '../../../redux/api-hub/async';
import { UserDto } from '../../../redux/auth/types';
import { AsyncComponent } from '../../../components/async-component/async-component';
import { Row, Col } from 'antd';
import { DashboardCard } from '../components/home/dashboard-card';
import { HeaderText } from '../components/home/dashboard-card.css';
import pluralize from 'pluralize';
import { Header } from '../../ui-kit/header';
import { WelcomeIcon } from './home.container.css';

const mapStateToProps = ({ accessKeys, connectors, auth }: ApplicationState) => ({
  accessKeys: accessKeys.data,
  connectors: connectors.data,
  user: auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  fetchConnectors: bindActionCreators(fetchConnectors, dispatch),
});

interface Props {
  connectors: ConnectorModal[];
  accessKeys: AccessKeyModal[];
  user: UserDto;
}

export interface PropsFromDispatch {
  fetchKeys: typeof fetchKeys;
  fetchConnectors: typeof fetchConnectors;
}

type AllProps = PropsFromDispatch & Props;

export class Home extends Component<AllProps> {
  render() {
    const { accessKeys, connectors, user, fetchConnectors, fetchKeys } = this.props;
    const asyncActions = () => [fetchConnectors(), fetchKeys(user.id)];

    return (
      <AsyncComponent getAsyncActions={asyncActions} message="">
        <Fragment>
          <HeaderText>Dashboard</HeaderText>
          <Header>
            <WelcomeIcon type="smile" />
            Welcome back {user.firstName}!
          </Header>
          <Row gutter={40}>
            <Col span={8}>
              <DashboardCard
                linkTo="access-keys"
                stat={accessKeys.length}
                text={`Access ${pluralize('Key', accessKeys.length)} configured`}
                iconType="api"
                color="#347AB7"
              />
            </Col>
            <Col span={8}>
              <DashboardCard
                linkTo="api-hub"
                stat={connectors.length}
                text="APIs to use"
                iconType="cloud"
                color="#5CB75A"
              />
            </Col>
          </Row>
        </Fragment>
      </AsyncComponent>
    );
  }
}

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
