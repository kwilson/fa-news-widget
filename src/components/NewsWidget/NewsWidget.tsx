import { useEffect, useReducer, useMemo, useCallback } from 'react';
import * as actions from './actions';
import { reducer, INITIAL_STATE } from './reducer';
import styles from './NewsWidget.module.css';
import { LoadingIndicator } from '../LoadingIndicator';
import { ArticleList } from '../ArticleList';
import { Button } from '../Button';
import { getTopHeadlines } from '../../data/getTopHeadlines';

interface IProps {
  apiKey: string;
}

export const NewsWidget: React.FunctionComponent<IProps> = ({ apiKey }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // State
  const { articles, totalNewsItems, currentPage } = state;

  const loadArticles = useCallback((pageNumber = 1) => {
    dispatch(actions.loadArticles());

    getTopHeadlines(apiKey, { page: pageNumber })
      .then(pageData => dispatch(actions.loadArticlesSuccess(pageData, pageNumber)));
  }, [apiKey]);

  useEffect(() => loadArticles(), [loadArticles]);

  // Selectors
  const isLoading = useMemo(() => {
    const { isLoadingArticles } = state;
    return isLoadingArticles;
  }, [state]);

  const canLoadMore = useMemo(() => {
    return !isLoading && totalNewsItems !== null && totalNewsItems > articles.length;
  }, [articles.length, isLoading, totalNewsItems]);

  // Event handlers
  const loadMore = () => {
    if (canLoadMore) {
      const nextPage = (currentPage || 0) + 1;
      loadArticles(nextPage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <h1 className={styles.heading}>News</h1>
        {/* <SourceFilter selectedId={selectedSource} sources={sources} onSourceSelected={onSourceSelected} /> */}
      </div>

      {articles.length > 0 && (
        <ArticleList articles={articles} />
      )}

      <Button data-testid="load-more-button" disabled={!canLoadMore} onClick={loadMore}>Show More</Button>

      <LoadingIndicator loading={isLoading} />
    </div>
  )
};
