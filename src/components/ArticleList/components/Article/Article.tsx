import type { INewsItem } from '../../../../data/getTopHeadlines';
import { PublishedDate } from '../PublishedDate';

import styles from './Article.module.css';

interface IProps extends INewsItem {
}

export const Article: React.FunctionComponent<IProps> = ({ sourceName, title, url, publishedAt, description }) => (
  <li className={styles.container} data-testid="article">
    <a href={url} className={styles.title} title={description}>{title}</a>

    <ul className={styles.meta}>
      <li className={styles.date}><PublishedDate value={publishedAt} /></li>
      <li className={styles.source}>{sourceName}</li>
    </ul>
  </li>
);
