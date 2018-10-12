import * as React from 'react';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Button', module)
  .add('Hello Button', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('Goodbye Button', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        Goodbye Button
      </span>
    </Button>
  ));
