import { useCard } from './Card';

export const CardBadge = () => {
  const { listing } = useCard();
  
  if (!listing.superhost) return null;

  return <div className="card-badge">Guest favorite</div>;
};
