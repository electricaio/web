import React, { SFC } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AsyncComponent } from '../async-component';
import { Spinner } from '../async-component.css';

describe('AsyncComponent', () => {
  const TestContentComponent: SFC = () => <div>content</div>;

  describe('promise error', () => {
    const asyncActionsFailure = (): ReactWrapper => {
      return mount(
        <AsyncComponent getAsyncActions={() => [Promise.reject()]}>
          <TestContentComponent />
        </AsyncComponent>
      );
    };

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
    const asyncActionsSuccess = () => {
      return mount(
        <AsyncComponent getAsyncActions={() => [Promise.resolve()]}>
          <TestContentComponent />
        </AsyncComponent>
      );
    };
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

    it('not error indictor', done => {
      const mounted = asyncActionsSuccess();
      setImmediate(() => {
        expect(
          mounted
            .update()
            .find(Spinner)
            .prop('indicator')
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
