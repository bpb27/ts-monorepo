import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, test } from 'vitest';
import { Intro } from './intro';

describe('App', () => {
  test('counter button', async () => {
    render(<Intro />);
    screen.getByText('count is 0');
    await userEvent.click(screen.getByText('count is 0'));
    screen.getByText('count is 1');
  });
});
