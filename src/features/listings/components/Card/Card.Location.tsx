import { useCard } from './Card';

export const CardLocation = () => {
  const { listing } = useCard();
  return <p className="card-location">{listing.location}</p>;
};
