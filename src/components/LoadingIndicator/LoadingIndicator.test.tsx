import { render } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';

import styles from './LoadingIndicator.module.css';

test('renders nothing when loading is not defined', () => {
  const { container } = render(<LoadingIndicator />);
  expect(container).toBeEmptyDOMElement();
});

test('renders nothing when loading is FALSE', () => {
  const { container } = render(<LoadingIndicator loading={false} />);
  expect(container).toBeEmptyDOMElement();
});

test('renders loading spinner when loading is TRUE', () => {
  const { container } = render(<LoadingIndicator loading />);
  expect(container.firstChild).toHaveClass(styles.indicator);
});
