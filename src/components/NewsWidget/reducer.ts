import { ISource } from "../../data/getSources/getSources";
import { INewsItem } from "../../data/getTopHeadlines";
import type { Actions } from './actions';

export interface IState {
  isLoadingArticles: boolean;
  isLoadingSources: boolean;
  articles: INewsItem[];
  totalNewsItems: number | null;
  currentPage: number | null;
  sources: ISource[];
  selectedSource: string;
}

export const INITIAL_STATE: IState = {
  isLoadingArticles: false,
  isLoadingSources: false,
  articles: [],
  sources: [],
  totalNewsItems: null,
  currentPage: null,
  selectedSource: '',
};

export const reducer: React.Reducer<IState, Actions> = (prevState, action) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(action.type, { ...action });
  }
  switch (action.type) {
    case 'LOAD_ARTICLES':
      return {
        ...prevState,
        isLoadingArticles: true
      };

    case 'LOAD_ARTICLES_SUCCESS':
      return {
        ...prevState,
        isLoadingArticles: false,
        totalNewsItems: action.payload.articles.totalResults,
        articles: prevState.articles.concat(action.payload.articles.articles),
        currentPage: action.payload.pageNumber,
      };

    case 'LOAD_SOURCES':
      return {
        ...prevState,
        isLoadingSources: true,
      };

    case 'LOAD_SOURCES_SUCCESS':
      return {
        ...prevState,
        isLoadingSources: false,
        sources: action.payload.sources,
      };

    case 'SELECT_SOURCE':
      return {
        ...prevState,
        selectedSource: action.payload.source,
        articles: INITIAL_STATE.articles,
        totalNewsItems: INITIAL_STATE.totalNewsItems,
      };

    default:
      return prevState;
  }
};
