import styles from './NewsWidget.module.css';

interface IProps {
  apiKey: string;
}

export const NewsWidget: React.FunctionComponent<IProps> = ({ apiKey }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <h1 className={styles.heading}>News</h1>
      </div>
    </div>
  )
};
