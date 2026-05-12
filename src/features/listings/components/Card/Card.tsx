import React, { createContext, useContext } from 'react';
import type { Listing } from '../../types';

interface CardContextType {
  listing: Listing;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a <Card /> component');
  }
  return context;
};

interface CardProps {
  listing: Listing;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ listing, children, className = '' }) => {
  return (
    <CardContext.Provider value={{ listing }}>
      <div className={`listing-card ${className}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
};
