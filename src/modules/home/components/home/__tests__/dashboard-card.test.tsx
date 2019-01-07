import React from 'react';
import { mount } from 'enzyme';
import { DashboardCard } from '../dashboard-card';
import { Stat, Container, LinkedFooter } from '../dashboard-card.css';
import { MemoryRouter } from 'react-router';

describe('Dashboard', () => {
  const stat = 100;
  const text = 'this is a test';
  const linkTo = 'linked';
  const color = 'blue';

  beforeEach(() => {
    this.component = mount(
      <MemoryRouter>
        <DashboardCard stat={stat} text={text} linkTo={linkTo} iconType="" color={color} />
      </MemoryRouter>
    );
  });

  it('renders the stat value', () => {
    expect(this.component.find(Stat).text()).toEqual(stat.toString());
  });

  it('renders a footer', () => {
    expect(this.component.find(LinkedFooter)).toHaveLength(1);
  });

  it('passes the color prop to the container and footer container', () => {
    expect(this.component.find(LinkedFooter).prop('color')).toEqual(color);
    expect(this.component.find(Container).prop('color')).toEqual(color);
  });

  it('renders a footer with a link', () => {
    expect(this.component.find(LinkedFooter).prop('to')).toEqual(linkTo);
  });
});
