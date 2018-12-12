import React, { SFC } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AsyncComponent } from '../async-component';
import { Spinner, ErrorIcon } from '../async-component.css';

describe('AsyncComponent', () => {
  const TestContentComponent: SFC = () => <div>content</div>;

  describe('promise error', () => {
    const asyncActionsFailure = (): ShallowWrapper => {
      return shallow(
        <AsyncComponent getAsyncActions={() => [Promise.reject()]}>
          <TestContentComponent />
        </AsyncComponent>
      );
    };

    it('show error indicator', async () => {
      const mounted = asyncActionsFailure();
      await Promise.resolve();
      expect(
        mounted
          .update()
          .find(Spinner)
          .prop('indicator')
      ).toEqual(<ErrorIcon type="frown" />);
    });

    it('spinning is true', async () => {
      const mounted = asyncActionsFailure();
      await Promise.resolve();
      expect(
        mounted
          .update()
          .find(Spinner)
          .prop('spinning')
      ).toBeTruthy();
    });

    it('child component is not displayed', async () => {
      const mounted = asyncActionsFailure();
      await Promise.resolve();
      expect(mounted.update().find(TestContentComponent)).toHaveLength(0);
    });

    it('tip show a message', async () => {
      const mounted = asyncActionsFailure();
      await Promise.resolve();
      expect(
        mounted
          .update()
          .find(Spinner)
          .prop('tip')
      ).toBeTruthy();
    });
    it('changesloading state to flase and error state to true', async () => {
      const mounted = asyncActionsFailure();
      await Promise.resolve();
      expect(mounted.state('loading')).toEqual(false);
      expect(mounted.state('error')).toEqual(true);
    });
  });

  describe('promise success', () => {
    const asyncActionsSuccess = () => {
      return shallow(
        <AsyncComponent getAsyncActions={() => [Promise.resolve()]}>
          <TestContentComponent />
        </AsyncComponent>
      );
    };
    it('spinner is not spinning', async () => {
      const mounted = asyncActionsSuccess();
      await Promise.resolve();
      expect(
        mounted
          .update()
          .find(Spinner)
          .prop('spinning')
      ).toEqual(false);
    });
    it('not error indictor', async () => {
      const mounted = asyncActionsSuccess();
      await Promise.resolve();
      expect(
        mounted
          .update()
          .find(Spinner)
          .prop('indicator')
      ).toEqual(false);
    });
    it('renders the child component', async () => {
      const mounted = asyncActionsSuccess();
      await Promise.resolve();
      expect(mounted.update().find(TestContentComponent)).toHaveLength(1);
    });
    it('loading state and error state is false', async () => {
      const mounted = asyncActionsSuccess();
      await Promise.resolve();
      expect(mounted.state('loading')).toEqual(false);
      expect(mounted.state('error')).toEqual(false);
    });
  });
});
