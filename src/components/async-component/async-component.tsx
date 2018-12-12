import React, { Component, Fragment, ReactElement } from 'react';

import { Spinner, ErrorIcon } from './async-component.css';

interface Props {
  getAsyncActions: () => any[];
  children: ReactElement<any>;
}

interface StateType {
  loading: boolean;
  error: boolean;
}

export class AsyncComponent extends Component<Props, StateType> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentDidMount = () => {
    const { getAsyncActions } = this.props;
    Promise.all(getAsyncActions())
      .then(e => {
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  render() {
    const errorIcon = <ErrorIcon type="frown" />;
    const loadingOrError = this.state.loading || this.state.error;
    return (
      <Fragment>
        <Spinner
          spinning={loadingOrError}
          indicator={this.state.error && errorIcon}
          tip={this.state.error && 'Oops there was a problem!'}
        >
          {!loadingOrError && React.cloneElement(this.props.children)}
        </Spinner>
      </Fragment>
    );
  }
}
