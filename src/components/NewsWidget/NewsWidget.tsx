import { useEffect, useReducer, useMemo, useCallback } from 'react';
import * as actions from './actions';
import { reducer, INITIAL_STATE } from './reducer';
import styles from './NewsWidget.module.css';
import { LoadingIndicator } from '../LoadingIndicator';
import { ArticleList } from '../ArticleList';
import { SourceFilter } from '../SourceFilter';
import { Button } from '../Button';
import { getTopHeadlines } from '../../data/getTopHeadlines';
import { getSources } from '../../data/getSources/getSources';

interface IProps {
  apiKey: string;
}

export const NewsWidget: React.FunctionComponent<IProps> = ({ apiKey }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // State
  const { articles, totalNewsItems, sources, currentPage, selectedSource } = state;

  const loadArticles = useCallback((pageNumber = 1) => {
    dispatch(actions.loadArticles());

    const sources = selectedSource === ''
      ? []
      : [selectedSource];

    getTopHeadlines(apiKey, { page: pageNumber, sources })
      .then(pageData => dispatch(actions.loadArticlesSuccess(pageData, pageNumber)));
  }, [apiKey, selectedSource]);

  const loadSources = useCallback(() => {
    dispatch(actions.loadSources());

    getSources(apiKey)
      .then(sources => dispatch(actions.loadSourcesSuccess(sources)));
  }, [apiKey]);

  useEffect(() => loadArticles(), [loadArticles]);
  useEffect(() => loadSources(), [loadSources]);

  // Selectors
  const isLoading = useMemo(() => {
    const { isLoadingArticles } = state;
    return isLoadingArticles;
    const { isLoadingArticles, isLoadingSources } = state;
    return isLoadingArticles || isLoadingSources;
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

  const onSourceSelected = (source: string) => {
    dispatch(actions.selectSource(source));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <h1 className={styles.heading}>News</h1>
        <SourceFilter selectedId={selectedSource} sources={sources} onSourceSelected={onSourceSelected} />
      </div>

      {articles.length > 0 && (
        <ArticleList articles={articles} />
      )}

      <Button data-testid="load-more-button" disabled={!canLoadMore} onClick={loadMore}>Show More</Button>

      <LoadingIndicator loading={isLoading} />
    </div>
  )
};
