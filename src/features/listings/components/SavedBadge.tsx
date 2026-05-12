import React from 'react';
import { FaHeart } from 'react-icons/fa';
import clsx from 'clsx';
import './SavedBadge.css';

interface SavedBadgeProps {
  count: number;
  variant?: 'light' | 'dark';
}

export const SavedBadge: React.FC<SavedBadgeProps> = ({ count, variant = 'dark' }) => {
  return (
    <div className={clsx('modern-saved-badge', `modern-saved-badge--${variant}`)}>
      <div className="badge-icon-wrapper">
        <FaHeart className="badge-icon" />
        {count > 0 && <span className="badge-count">{count}</span>}
      </div>
      <span className="badge-text">{count === 1 ? '1 saved' : `${count} saved`}</span>
    </div>
  );
};
