import { useCard } from './Card';

export const CardRating = () => {
  const { listing } = useCard();
  return (
    <div className="card-rating">
      <span className="star">★</span>
      <span>{listing.rating}</span>
    </div>
  );
};
