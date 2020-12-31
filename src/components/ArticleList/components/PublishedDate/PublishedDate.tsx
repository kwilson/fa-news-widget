import { useMemo } from 'react';

interface IProps {
  value: string;
}

export const PublishedDate: React.FunctionComponent<IProps> = ({ value }) => {
  const displayValue = useMemo(() => {
    const date = new Date(value);
    return date.toLocaleDateString();
  }, [value]);

  return (
    <time dateTime={value} data-testid="published-date">{displayValue}</time>
  );
};
