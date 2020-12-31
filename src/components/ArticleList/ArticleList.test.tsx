import { render, screen } from '@testing-library/react';
import { INewsItem } from '../../data/getTopHeadlines';
import { ArticleList } from './ArticleList';

import styles from './ArticleList.module.css';

test('renders as expected', () => {
  const publishDate = new Date();
  const articles: INewsItem[] = [1, 2, 3].map(x => ({
    sourceId: `article-${x}`,
    sourceName: `source-${x % 2}`,
    url: `http://article-utl.invalid/${x}`,
    publishedAt: publishDate.toISOString(),
    title: `Article ${x}`,
    description: `Description ${x}`,
  }));

  render(<ArticleList articles={articles} />);

  const el = screen.getByTestId('article-list');
  expect(el).toHaveClass(styles.container);

  articles.forEach(({ title }) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
