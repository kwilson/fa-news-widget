import { INITIAL_STATE, IState, reducer } from './reducer';
import * as actions from './actions';
import { INewsItem } from '../../data/getTopHeadlines';
import { ISource } from '../../data/getSources';

const getArticleFromSeed = (x: number): INewsItem => ({
  sourceId: `article-${x}`,
  sourceName: `source-${x % 2}`,
  url: `http://article-utl.invalid/${x}`,
  publishedAt: new Date().toISOString(),
  title: `Article ${x}`,
  description: `Description ${x}`,
});

const getSourceFromSeed = (x: number): ISource => ({
  id: `src-${x}`,
  name: `Source ${x}`,
});

describe('reducer', () => {
  it('returns the same state value on no-match', () => {
    const state: IState = { ...INITIAL_STATE };
    const result = reducer(state, { type: Symbol('no-op') as any });
    expect(result).toBe(state);
  });

  describe('isLoadingArticles', () => {
    it('is FALSE by default', () => {
      expect(INITIAL_STATE.isLoadingArticles).toBe(false);
    });

    it(`is set to TRUE on ${actions.loadArticles.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        isLoadingArticles: false,
      };

      const { isLoadingArticles } = reducer(state, actions.loadArticles());

      expect(isLoadingArticles).toBe(true);
    });

    it(`is set to FALSE on ${actions.loadArticlesSuccess.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        isLoadingArticles: true,
      };

      const { isLoadingArticles } = reducer(state, actions.loadArticlesSuccess({
        totalResults: 1,
        articles: [],
      }, 1));

      expect(isLoadingArticles).toBe(false);
    });

    it(`is set to FALSE on ${actions.loadArticlesFailure.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        isLoadingArticles: true,
      };

      const { isLoadingArticles } = reducer(state, actions.loadArticlesFailure());

      expect(isLoadingArticles).toBe(false);
    });
  });

  describe('isLoadingSources', () => {
    it('is FALSE by default', () => {
      expect(INITIAL_STATE.isLoadingSources).toBe(false);
    });

    it(`is set to TRUE on ${actions.loadSources.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        isLoadingSources: false,
      };

      const { isLoadingSources } = reducer(state, actions.loadSources());

      expect(isLoadingSources).toBe(true);
    });

    it(`is set to FALSE on ${actions.loadSourcesSuccess.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        isLoadingSources: true,
      };

      const { isLoadingSources } = reducer(state, actions.loadSourcesSuccess([]));

      expect(isLoadingSources).toBe(false);
    });

    it(`is set to FALSE on ${actions.loadSourcesFailure.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        isLoadingSources: true,
      };

      const { isLoadingSources } = reducer(state, actions.loadSourcesFailure());

      expect(isLoadingSources).toBe(false);
    });
  });

  describe('totalNewsItems', () => {
    it('is NULL by default', () => {
      expect(INITIAL_STATE.totalNewsItems).toBe(null);
    });

    it(`is set on ${actions.loadArticlesSuccess.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        totalNewsItems: null,
      };

      const results = 123;

      const { totalNewsItems } = reducer(state, actions.loadArticlesSuccess({
        totalResults: results,
        articles: []
      }, 1));

      expect(totalNewsItems).toBe(results);
    });

    it(`is cleared on ${actions.selectSource}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        totalNewsItems: 123,
      };

      const { totalNewsItems } = reducer(state, actions.selectSource(''));

      expect(totalNewsItems).toBe(INITIAL_STATE.totalNewsItems);
    });
  });

  describe('articles', () => {
    it('is empty by default', () => {
      expect(INITIAL_STATE.articles).toEqual([]);
    });

    it(`is set on ${actions.loadArticlesSuccess.name}`, () => {
      const newArticles: INewsItem[] = [1, 2, 3].map(getArticleFromSeed);

      const state: IState = {
        ...INITIAL_STATE,
        articles: [],
      };

      const { articles } = reducer(state, actions.loadArticlesSuccess({
        totalResults: 3,
        articles: newArticles
      }, 1));

      expect(articles).toEqual(newArticles);
    });

    it(`concats new items on ${actions.loadArticlesSuccess.name}`, () => {
      const existingArticles: INewsItem[] = [1, 2, 3].map(getArticleFromSeed);
      const newArticles: INewsItem[] = [4, 5, 6].map(getArticleFromSeed);

      const state: IState = {
        ...INITIAL_STATE,
        articles: existingArticles,
      };

      const { articles } = reducer(state, actions.loadArticlesSuccess({
        totalResults: 6,
        articles: newArticles
      }, 1));

      expect(articles).toEqual([...existingArticles, ...newArticles]);
    });

    it(`is cleared on ${actions.selectSource}`, () => {
      const existingArticles: INewsItem[] = [1, 2, 3].map(getArticleFromSeed);

      const state: IState = {
        ...INITIAL_STATE,
        articles: existingArticles,
      };

      const { articles } = reducer(state, actions.selectSource(''));

      expect(articles).toBe(INITIAL_STATE.articles);
    });
  });

  describe('sources', () => {
    it('is empty by default', () => {
      expect(INITIAL_STATE.sources).toEqual([]);
    });

    it(`is set on ${actions.loadSourcesSuccess.name}`, () => {
      const newSources: ISource[] = [1, 2, 3].map(getSourceFromSeed);

      const state: IState = {
        ...INITIAL_STATE,
        sources: [],
      };

      const { sources } = reducer(state, actions.loadSourcesSuccess(newSources));

      expect(sources).toEqual(newSources);
    });

    it(`replaces existing items on ${actions.loadSourcesSuccess.name}`, () => {
      const existingSources = [1, 2, 3].map(getSourceFromSeed);
      const newSources = [4, 5, 6].map(getSourceFromSeed);

      const state: IState = {
        ...INITIAL_STATE,
        sources: existingSources,
      };

      const { sources } = reducer(state, actions.loadSourcesSuccess(newSources));

      expect(sources).toEqual(newSources);
    });
  });

  describe('currentPage', () => {
    it('is NULL by default', () => {
      expect(INITIAL_STATE.currentPage).toBe(null);
    });

    it(`is set on ${actions.loadArticlesSuccess.name} when NULL`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        currentPage: null,
      };

      const newPage = 10;
      const newArticles = [1].map(getArticleFromSeed);

      const { currentPage } = reducer(state, actions.loadArticlesSuccess({
        totalResults: 1,
        articles: newArticles
      }, newPage));

      expect(currentPage).toBe(newPage);
    });
  });

  describe('selectedSource', () => {
    it('is empty string by default', () => {
      expect(INITIAL_STATE.selectedSource).toBe('');
    });

    it(`is set on ${actions.selectSource.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        selectedSource: '',
      };

      const newSource = 'bbc-news';

      const { selectedSource } = reducer(state, actions.selectSource(newSource));

      expect(selectedSource).toBe(newSource);
    });
  });

  describe('error', () => {
    it('is null by default', () => {
      expect(INITIAL_STATE.error).toBe(null);
    });

    it(`is set on ${actions.loadArticlesFailure.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        error: null,
      };

      const newError = new Error('error message');

      const { error } = reducer(state, actions.loadArticlesFailure(newError));

      expect(error).toBe(newError);
    });

    it(`is set on ${actions.loadSourcesFailure.name}`, () => {
      const state: IState = {
        ...INITIAL_STATE,
        error: null,
      };

      const newError = new Error('error message');

      const { error } = reducer(state, actions.loadSourcesFailure(newError));

      expect(error).toBe(newError);
    });
  });
});
