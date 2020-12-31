import { INITIAL_STATE, IState, reducer } from './reducer';
import * as actions from './actions';
import { INewsItem } from '../../data/getTopHeadlines';

const getArticleFromSeed = (x: number): INewsItem => ({
  sourceId: `article-${x}`,
  sourceName: `source-${x % 2}`,
  url: `http://article-utl.invalid/${x}`,
  publishedAt: new Date().toISOString(),
  title: `Article ${x}`,
  description: `Description ${x}`,
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
});
