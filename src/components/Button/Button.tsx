import styles from './Button.module.css';

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

export const Button: React.FunctionComponent<IProps> = ({ children, className = '', ...props }) => (
  <button className={`${styles.button} ${className}`} {...props}>{children}</button>
);
