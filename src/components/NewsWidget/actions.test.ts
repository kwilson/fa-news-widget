import { ISource } from '../../data/getSources';
import { INewsItemCollection } from '../../data/getTopHeadlines';
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

describe(`${actions.loadArticlesFailure.name}`, () => {
  it('returns the expected action', () => {
    const error = 'error text';
    expect(actions.loadArticlesFailure(error)).toEqual({
      type: 'LOAD_ARTICLES_FAILURE',
      error: true,
      payload: error
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

describe(`${actions.loadSourcesFailure.name}`, () => {
  it('returns the expected action', () => {
    const error = 'error text';
    expect(actions.loadSourcesFailure(error)).toEqual({
      type: 'LOAD_SOURCES_FAILURE',
      error: true,
      payload: error
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
