import { useEffect, useReducer, useMemo } from 'react';
import * as actions from './actions';
import { reducer, INITIAL_STATE } from './reducer';
import styles from './NewsWidget.module.css';
import { LoadingIndicator } from '../LoadingIndicator';
import { ArticleList } from '../ArticleList';
import { getTopHeadlines } from '../../data/getTopHeadlines';

interface IProps {
  apiKey: string;
}

export const NewsWidget: React.FunctionComponent<IProps> = ({ apiKey }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch(actions.loadArticles());
    getTopHeadlines(apiKey)
      .then(pageData => dispatch(actions.loadArticlesSuccess(pageData)));
  }, [apiKey]);

  // Selectors
  const isLoading = useMemo(() => {
    const { isLoadingArticles } = state;
    return isLoadingArticles;
  }, [state]);

  const { articles } = state;

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <h1 className={styles.heading}>News</h1>
      </div>

      {articles.length > 0 && (
        <ArticleList articles={articles} />
      )}

      <LoadingIndicator loading={isLoading} />
    </div>
  )
};
