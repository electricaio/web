import React, { SFC } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AsyncComponent, AsyncComponentProps } from '../async-component';
import { Spinner } from '../async-component.css';
import { Spin } from 'antd';

describe('AsyncComponent', () => {
  const TestContentComponent: SFC = () => <div>content</div>;
  const loadingMessage = 'loading';

  const asyncActionsSuccess = () => {
    return mount(
      <AsyncComponent message={loadingMessage} getAsyncActions={() => [Promise.resolve()]}>
        <TestContentComponent />
      </AsyncComponent>
    );
  };

  const asyncActionsFailure = (overrideProps?: Partial<AsyncComponentProps>): ReactWrapper => {
    return mount(
      <AsyncComponent
        message={loadingMessage}
        getAsyncActions={() => [Promise.reject()]}
        {...overrideProps}
      >
        <TestContentComponent />
      </AsyncComponent>
    );
  };
  it('spins when actions are pending', () => {
    expect(
      asyncActionsSuccess()
        .find(Spin)
        .prop('spinning')
    ).toBeTruthy();
  });

  it('sets showError prop to true by default', () => {
    expect(AsyncComponent.defaultProps.showError).toBe(true);
  });

  it('contains the delay prop', () => {
    expect(
      asyncActionsSuccess()
        .find(Spin)
        .prop('delay')
    ).toBeTruthy();
  });

  it('sets loading message', () => {
    expect(
      asyncActionsSuccess()
        .find(Spin)
        .prop('tip')
    ).toEqual(loadingMessage);
  });

  it('show loading icon', done => {
    const mounted = asyncActionsSuccess();
    setImmediate(() => {
      expect(
        mounted
          .update()
          .find(Spinner)
          .prop('indicator').props.type
      ).toEqual('loading');
      done();
    });
  });
  describe('promise error', () => {
    it('show error indicator', done => {
      const mounted = asyncActionsFailure();
      setImmediate(() => {
        expect(
          mounted
            .update()
            .find(Spinner)
            .prop('indicator').props.type
        ).toEqual('frown');
        done();
      });
    });

    it('dont show an error if showError prop is false', done => {
      const mounted = asyncActionsFailure({ showError: false });
      setImmediate(() => {
        expect(
          mounted
            .update()
            .find(Spinner)
            .prop('indicator').props.type
        ).toEqual('loading');
        expect(mounted.state('error')).toBe(false);
        done();
      });
    });

    it('spinning is true', done => {
      const mounted = asyncActionsFailure();

      setImmediate(() => {
        expect(
          mounted
            .update()
            .find(Spinner)
            .prop('spinning')
        ).toBeTruthy();
        done();
      });
    });

    it('child component is not displayed', done => {
      const mounted = asyncActionsFailure();
      setImmediate(() => {
        expect(mounted.update().find(TestContentComponent)).toHaveLength(0);
        done();
      });
    });

    it('tip show a message', done => {
      const mounted = asyncActionsFailure();
      setImmediate(() => {
        expect(
          mounted
            .update()
            .find(Spinner)
            .prop('tip')
        ).toBeTruthy();
        done();
      });
    });
    it('changes loading state to false and error state to true', done => {
      const mounted = asyncActionsFailure();
      setImmediate(() => {
        expect(mounted.state('loading')).toEqual(false);
        expect(mounted.state('error')).toEqual(true);
        done();
      });
    });
  });

  describe('promise success', () => {
    it('spinner is not spinning', done => {
      const mounted = asyncActionsSuccess();
      setImmediate(() => {
        expect(
          mounted
            .update()
            .find(Spinner)
            .prop('spinning')
        ).toEqual(false);
        done();
      });
    });

    it('renders the child component', done => {
      const mounted = asyncActionsSuccess();
      setImmediate(() => {
        expect(mounted.update().find(TestContentComponent)).toHaveLength(1);
        done();
      });
    });

    it('loading state and error state is false', done => {
      const mounted = asyncActionsSuccess();
      setImmediate(() => {
        expect(mounted.state('loading')).toEqual(false);
        expect(mounted.state('error')).toEqual(false);
        done();
      });
    });
  });
});
