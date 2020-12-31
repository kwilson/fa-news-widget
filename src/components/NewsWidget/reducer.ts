import { INewsItem } from "../../data/getTopHeadlines";
import type { Actions } from './actions';

export interface IState {
  isLoadingArticles: boolean;
  articles: INewsItem[];
  totalNewsItems: number | null;
  currentPage: number | null;
}

export const INITIAL_STATE: IState = {
  isLoadingArticles: false,
  articles: [],
  totalNewsItems: null,
  currentPage: null,
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

    default:
      return prevState;
  }
};
