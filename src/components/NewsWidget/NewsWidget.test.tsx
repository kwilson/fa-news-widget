import { render, screen } from '@testing-library/react';
import { NewsWidget } from './NewsWidget';

import { getSources, ISource } from '../../data/getSources';
import { getTopHeadlines, INewsItem, INewsItemCollection } from '../../data/getTopHeadlines';

jest.mock('../../data/getSources');
jest.mock('../../data/getTopHeadlines');

function asMock(fn: Function) {
  if (jest.isMockFunction(fn)) {
    return fn;
  }

  throw new Error('function is not mocked');
}

const mockSources: ISource[] = [1, 2, 3].map(x => ({
  id: `src-${x}`,
  name: `Source ${x}`
}));

const mockNewsItems: INewsItem[] = [1, 2, 3].map(x => ({
  sourceId: `src-${x % 3}`,
  sourceName: `Source ${x}`,
  title: `Headline ${x}`,
  description: `description ${x}`,
  url: `http://mock.invalid/${x}`,
  publishedAt: new Date().toISOString()
}));

const mockTopHeadlines: INewsItemCollection = {
  totalResults: mockNewsItems.length,
  articles: mockNewsItems
};

test('renders a loading indicator when sources are loading', async () => {
  asMock(getSources).mockReturnValue(new Promise(() => {}));
  asMock(getTopHeadlines).mockResolvedValue(new Promise(() => {}));

  render(<NewsWidget apiKey="api-key-value" />);

  expect(await screen.findByTestId('loading-overlay')).toBeInTheDocument();
});

test('renders data once loaded', async () => {
  asMock(getSources).mockReturnValue(Promise.resolve(mockSources));
  asMock(getTopHeadlines).mockReturnValue(Promise.resolve(mockTopHeadlines));

  render(<NewsWidget apiKey="api-key-value" />);

  expect(await screen.findByTestId('article-list')).toBeInTheDocument();
  expect(await screen.findByTestId('load-more-button')).toBeInTheDocument();

  const renderedArticles = await screen.findAllByTestId('article');
  mockNewsItems.forEach(({ title }, idx) => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(title).parentElement).toBe(renderedArticles[idx]);
  })
});
