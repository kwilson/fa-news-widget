import { render, screen } from '@testing-library/react';
import { PublishedDate } from './PublishedDate';

test('renders the value as expected', () => {
  const date = new Date();
  const value = date.toISOString();

  render(<PublishedDate value={value} />);

  const el = screen.getByTestId('published-date');
  expect(el).toHaveAttribute('dateTime', value);
  expect(el).toHaveTextContent(date.toLocaleDateString());
});
