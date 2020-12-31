import { ISource } from '../../data/getSources/getSources';
import type { INewsItemCollection } from '../../data/getTopHeadlines/getTopHeadlines';

export const loadArticles = () => <const>({
  type: 'LOAD_ARTICLES',
});

export const loadArticlesSuccess = (articles: INewsItemCollection, pageNumber: number) => <const>({
  type: 'LOAD_ARTICLES_SUCCESS',
  payload: {
    articles,
    pageNumber
  }
});


export const loadSources = () => <const>({
  type: 'LOAD_SOURCES',
});

export const loadSourcesSuccess = (sources: ISource[]) => <const>({
  type: 'LOAD_SOURCES_SUCCESS',
  payload: {
    sources,
  }
});

export const selectSource = (source: string) => <const>({
  type:'SELECT_SOURCE',
  payload: {
    source,
  },
});

export type Actions =
| ReturnType<typeof loadArticles>
| ReturnType<typeof loadArticlesSuccess>
| ReturnType<typeof loadSources>
| ReturnType<typeof loadSourcesSuccess>
| ReturnType<typeof selectSource>;
