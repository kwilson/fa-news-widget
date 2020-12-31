import { useCallback, useMemo, ChangeEventHandler } from 'react';

import type { ISource } from '../../data/getSources';
import styles from './SourceFilter.module.css';

interface IProps {
  sources: ISource[];
  selectedId?: string;
  onSourceSelected: (id: string) => void;
}

export const SourceFilter: React.FunctionComponent<IProps> = ({ selectedId = '', sources = [], onSourceSelected }) => {
  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((e) => {
    onSourceSelected(e.target.value);
  }, [onSourceSelected]);

  const options = useMemo(() => {
    return sources.map((source) => (
      <option value={source.id} key={source.id}>{source.name}</option>
    ));
  }, [sources]);

  // If there's nothing to filter on, no reason to show
  // the filter.
  if (!sources.length) {
    return null;
  }

  return (
    <select className={styles.select} value={selectedId} onChange={onChange} data-testid="select-source">
      <option value="" disabled>Filter By Source</option>
      {options}
    </select>
  );
}
