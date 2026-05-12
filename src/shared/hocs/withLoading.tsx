import React from 'react';
import { Spinner } from '../components/Spinner';

export function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { isLoading: boolean }> {
  const WrappedComponent: React.FC<P & { isLoading: boolean }> = ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <Spinner />
        </div>
      );
    }

    return <Component {...(props as P)} />;
  };

  return WrappedComponent;
}
