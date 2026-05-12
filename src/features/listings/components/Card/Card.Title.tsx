import { useCard } from './Card';

export const CardTitle = () => {
  const { listing } = useCard();
  return <h3 className="card-title">{listing.title}</h3>;
};
