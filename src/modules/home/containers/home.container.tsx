import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home } from '../components/home/home';
import { ApplicationState } from '../../../redux/store';

const mapStateToProps = ({ auth }: ApplicationState) => ({
  userName: auth.user.firstName,
});

interface PropsFromState {
  userName: string;
}

export class HomeComponent extends Component<PropsFromState> {
  render() {
    const { userName } = this.props;
    return <Home userName={userName} />;
  }
}

export const HomeContainer = connect(
  mapStateToProps,
  {}
)(HomeComponent);
