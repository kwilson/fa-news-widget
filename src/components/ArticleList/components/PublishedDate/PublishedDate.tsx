interface IProps {
  value: string;
}

export const PublishedDate: React.FunctionComponent<IProps> = ({ value }) => {
  const date = new Date(value).toLocaleDateString();

  return (
    <time dateTime={value} data-testid="published-date">{date}</time>
  );
};
