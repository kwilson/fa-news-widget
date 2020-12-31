import type { INewsItemCollection } from '../../data/getTopHeadlines/getTopHeadlines';

export const loadArticles = () => <const>({
  type: 'LOAD_ARTICLES',
});

export const loadArticlesSuccess = (articles: INewsItemCollection) => <const>({
  type: 'LOAD_ARTICLES_SUCCESS',
  payload: articles
});

export type Actions =
| ReturnType<typeof loadArticles>
| ReturnType<typeof loadArticlesSuccess>;
