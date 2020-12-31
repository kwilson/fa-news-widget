import { ISource } from '../../data/getSources/getSources';
import { INewsItemCollection } from '../../data/getTopHeadlines/getTopHeadlines';
import * as actions from './actions';

describe(`${actions.loadArticles.name}`, () => {
  it('returns the expected action', () => {
    expect(actions.loadArticles()).toEqual({
      type: 'LOAD_ARTICLES',
    });
  });
});

describe(`${actions.loadArticlesSuccess.name}`, () => {
  it('returns the expected action', () => {
    const articles: INewsItemCollection = {
      totalResults: 100,
      articles: []
    };
    const pageNumber = 123;

    expect(actions.loadArticlesSuccess(articles, pageNumber)).toEqual({
      type: 'LOAD_ARTICLES_SUCCESS',
      payload: {
        articles,
        pageNumber,
      }
    });
  });
});

describe(`${actions.loadSources.name}`, () => {
  it('returns the expected action', () => {
    expect(actions.loadSources()).toEqual({
      type: 'LOAD_SOURCES',
    });
  });
});

describe(`${actions.loadSourcesSuccess.name}`, () => {
  it('returns the expected action', () => {
    const sources: ISource[] = [];

    expect(actions.loadSourcesSuccess(sources)).toEqual({
      type: 'LOAD_SOURCES_SUCCESS',
      payload: {
        sources,
      }
    });
  });
});

describe(`${actions.selectSource.name}`, () => {
  it('returns the expected action', () => {
    const source = 'abc';
    expect(actions.selectSource(source)).toEqual({
      type: 'SELECT_SOURCE',
      payload: { source },
    });
  });
});
