import React, { Component, Fragment } from 'react';

interface PropsFromState {
  userName: string;
}

export class Home extends Component<PropsFromState> {
  render() {
    const { userName } = this.props;
    return <Fragment>Welcome {userName}!</Fragment>;
  }
}
