import { useCard } from './Card';

export const CardPrice = () => {
  const { listing } = useCard();
  return (
    <div className="card-price" style={{ marginTop: '4px' }}>
      <span style={{ fontWeight: 600 }}>{listing.price.toLocaleString()} RWF</span>
      <span style={{ color: '#717171', marginLeft: '4px' }}>night</span>
    </div>
  );
};
