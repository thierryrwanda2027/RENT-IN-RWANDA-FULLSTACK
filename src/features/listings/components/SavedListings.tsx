import React from 'react';
import { Transition } from '@headlessui/react';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { useStore } from '../../../store/StoreContext';
import { useFavorites } from '../hooks/useFavorites';
import numeral from 'numeral';
import './SavedListings.css';

interface SavedListingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedListings: React.FC<SavedListingsProps> = ({ isOpen, onClose }) => {
  const { state } = useStore();
  const { isSaved } = useFavorites();
  const savedListings = state.listings.filter(l => isSaved(l.id));

  return (
    <Transition
      show={isOpen}
      as="div"
      enter="panel-enter"
      enterFrom="panel-enter-from"
      enterTo="panel-enter-to"
      leave="panel-leave"
      leaveFrom="panel-leave-from"
      leaveTo="panel-leave-to"
      className="saved-listings-panel"
    >
      <div className="saved-listings-header">
        <div className="header-title">
          <FaHeart className="heart-icon" />
          <h2>Saved Stays</h2>
        </div>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>

      <div className="saved-listings-content">
        {savedListings.length > 0 ? (
          savedListings.map(listing => (
            <div key={listing.id} className="saved-item">
              <img src={listing.img} alt={listing.title} className="saved-item-img" />
              <div className="saved-item-info">
                <h4>{listing.title}</h4>
                <p>{listing.location}</p>
                <span className="saved-item-price">{numeral(listing.price).format('0,0')} RWF / night</span>
              </div>
            </div>
          ))
        ) : (
          <div className="saved-empty">
            <p>You haven't saved any stays yet.</p>
          </div>
        )}
      </div>
    </Transition>
  );
};
