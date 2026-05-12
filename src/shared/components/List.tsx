import React from 'react';
import { Spinner } from './Spinner';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
}

export function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No items found',
  loading = false,
  className = '',
}: ListProps<T>) {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-state" style={{ textAlign: 'center', padding: '50px' }}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
}
