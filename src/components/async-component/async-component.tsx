import React, { Component, Fragment, ReactElement } from 'react';

import { Spinner, ErrorIcon, LoadingIcon } from './async-component.css';

export interface AsyncComponentProps {
  getAsyncActions: () => any[];
  children: ReactElement<any>;
  message: string;
  showError?: boolean;
}
interface DefaultProps {
  showError: boolean;
}

interface StateType {
  loading: boolean;
  error: boolean;
}

export class AsyncComponent extends Component<AsyncComponentProps, StateType> {
  static defaultProps: DefaultProps = {
    showError: true,
  };
  constructor(props: AsyncComponentProps) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    const { getAsyncActions } = this.props;
    return Promise.all(getAsyncActions())
      .then(e => {
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: this.props.showError,
        });
      });
  }

  render() {
    const { message, children } = this.props;
    const loadingOrError = this.state.loading || this.state.error;
    return (
      <Fragment>
        <Spinner
          size="large"
          delay={300}
          spinning={loadingOrError}
          indicator={
            this.state.error ? <ErrorIcon type="frown" /> : <LoadingIcon type="loading" spin />
          }
          tip={this.state.error ? 'Oops there was a problem!' : message}
        />
        {!loadingOrError && React.cloneElement(children)}
      </Fragment>
    );
  }
}
