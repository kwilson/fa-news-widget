import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

import styles from './Button.module.css';

test('renders as expected with default class', () => {
  const text = 'Button Text';
  const { container } = render(<Button>{text}</Button>);
  expect(container.firstChild).toHaveClass(styles.button);
  expect(container.firstChild).toHaveTextContent(text);
});

test('renders as expected with manual class', () => {
  const text = 'Button Text';
  const className = 'button-class';

  const { container } = render(<Button className={className}>{text}</Button>);

  expect(container.firstChild).toHaveClass(styles.button);
  expect(container.firstChild).toHaveClass(className);
  expect(container.firstChild).toHaveTextContent(text);
});

test('handles click event', () => {
  const text = 'Button Text';
  const onClick = jest.fn();

  render(<Button onClick={onClick}>{text}</Button>);

  userEvent.click(screen.getByText(text));

  expect(onClick).toHaveBeenCalled();
});
