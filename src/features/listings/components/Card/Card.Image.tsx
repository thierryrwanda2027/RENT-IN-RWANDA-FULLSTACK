import { useCard } from './Card';
import { useFavorites } from '../../hooks/useFavorites';
import { FaHeart } from 'react-icons/fa';

export const CardImage = () => {
  const { listing } = useCard();
  const { isSaved, toggle } = useFavorites();

  return (
    <div className="card-image-container" style={{ position: 'relative' }}>
      <img src={listing.img} alt={listing.title} className="card-image" loading="lazy" />
      <button 
        className="favorite-btn" 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(listing.id, listing.title);
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        <FaHeart 
          size={24} 
          color={isSaved(listing.id) ? '#ff385c' : 'rgba(0,0,0,0.5)'}
          style={{
            stroke: 'white',
            strokeWidth: '20px', // Simulating stroke for FaHeart
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))'
          }}
        />
      </button>
    </div>
  );
};
