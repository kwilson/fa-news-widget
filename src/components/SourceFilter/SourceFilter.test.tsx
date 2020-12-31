import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import type { ISource } from '../../data/getSources/getSources';
import { SourceFilter } from './SourceFilter';
import styles from './SourceFilter.module.css';

describe(`<${SourceFilter.name} />`, () => {
  const sources: ISource[] = [1, 2, 3].map((x) => ({
    id: `${x}`,
    name: `Source ${x}`,
  }));

  const onSourceSelected = jest.fn();

  test('renders empty when there are no sources to filter', () => {
    const { container } = render(
      <SourceFilter sources={[]} onSourceSelected={onSourceSelected} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('renders sources when provided', () => {
    render(
      <SourceFilter sources={sources} onSourceSelected={onSourceSelected} />
    );

    const defaultOption = screen.getByText('Filter By Source');
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption).toHaveAttribute('value', '');
    expect(defaultOption).toHaveAttribute('disabled');

    const select = screen.getByTestId('select-source');
    expect(select).toHaveProperty('value', '');
    expect(select).toHaveClass(styles.select);

    sources.forEach(({ id, name }) => {
      const option = screen.getByText(name);
      expect(option).toBeInTheDocument();
      expect(option).toHaveAttribute('value', id);
    });
  });

  test('renders selected ID when provided', () => {
    const selected = sources[1];

    render(
      <SourceFilter selectedId={selected.id} sources={sources} onSourceSelected={onSourceSelected} />
    );

    const select = screen.getByTestId('select-source');
    expect(select).toHaveProperty('value', selected.id);
  });

  test('handles onSourceSelected', () => {
    const toSelect = sources[1].id;

    render(
      <SourceFilter sources={sources} onSourceSelected={onSourceSelected} />
    );

    userEvent.selectOptions(screen.getByTestId('select-source'), [toSelect]);

    expect(onSourceSelected).toHaveBeenCalledWith(toSelect);
  });
});
