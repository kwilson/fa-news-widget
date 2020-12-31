import { INewsItem } from '../../data/getTopHeadlines';
import { Article } from './components/Article';

import styles from './ArticleList.module.css';

export interface IProps {
  articles: INewsItem[];
}

export const ArticleList: React.FunctionComponent<IProps> = ({ articles }) => {
  return (
    <ul className={styles.container} data-testid="article-list">
      {articles.map((article) => (
        <Article key={article.url} {...article} />
      ))}
    </ul>
  );
};

