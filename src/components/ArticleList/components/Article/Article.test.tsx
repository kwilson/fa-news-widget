import { render, screen } from '@testing-library/react';
import { INewsItem } from '../../../../data/getTopHeadlines';
import { Article } from './Article';

import styles from './Article.module.css';

test('renders as expected', () => {
  const publishDate = new Date();
  const article: INewsItem = {
    sourceId: 'source-id',
    sourceName: 'Source Name',
    url: 'http://article-utl.invalid',
    publishedAt: publishDate.toISOString(),
    title: 'Article Title Value',
    description: 'Article description vaue',
  };

  render(<Article {...article} />);

  const el = screen.getByTestId('article');
  expect(el).toHaveClass(styles.container);

  const title = screen.getByText(article.title);
  expect(title).toBeInTheDocument();
  expect(title).toHaveAttribute('href', article.url);
  expect(title).toHaveClass(styles.title);

  const publishedDate = screen.getByText(publishDate.toLocaleDateString());
  expect(publishedDate).toBeInTheDocument();
  expect(publishedDate.parentElement).toHaveClass(styles.date);

  const sourceName = screen.getByText(article.sourceName);
  expect(sourceName).toBeInTheDocument();
  expect(sourceName).toHaveClass(styles.source);
});
