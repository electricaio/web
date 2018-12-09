import React, { SFC } from 'react';
import { format } from 'date-fns';

type TDateProps = {
  date: string;
};

export const DateComponent: SFC<TDateProps> = ({ date }) => <div>{format(date, 'DD.MM.YYYY')}</div>;
