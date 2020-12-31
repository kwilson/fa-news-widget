import styles from './LoadingIndicator.module.css';

export interface IProps {
  loading?: boolean;
}

export const LoadingIndicator: React.FunctionComponent<IProps> = ({ loading = false }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className={styles.indicator} data-testid="loading-overlay">
      <span className={styles.text}>
        Loading&hellip;
      </span>
    </div>
  )
};
