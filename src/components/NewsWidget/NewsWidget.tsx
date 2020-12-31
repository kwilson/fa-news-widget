import styles from './NewsWidget.module.css';

interface IProps {
  apiKey: string;
}

export const NewsWidget: React.FunctionComponent<IProps> = ({ apiKey }) => {
  return (
    <div className={styles.NewsWidget}>NewsWidget with API Key {apiKey}</div>
  )
};
