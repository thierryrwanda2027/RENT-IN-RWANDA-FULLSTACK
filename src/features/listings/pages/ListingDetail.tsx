import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useListing } from '../hooks/useListing';
import { Spinner } from '../../../shared/components/Spinner';
import './ListingDetail.css';

import { Card } from '../components/Card';

export const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listing, isLoading, isError } = useListing(id);
  
  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;

  if (isError || !listing) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Listing not found</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px' }}>Go Back</button>
      </div>
    );
  }

  // Mock extra images for the grid
  const extraImages = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <Card listing={listing} className="listing-detail-page">
      <div className="container" style={{ paddingTop: '20px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            padding: '12px 0',
            fontWeight: 500,
            color: '#222'
          }}
        >
          ← Back
        </button>

        <div className="listing-detail-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Card.Title />
            <Card.Badge />
          </div>
          <div className="listing-meta">
            <div className="listing-meta-left">
              <Card.Rating />
              <span>· 10 reviews</span>
              <span>· {listing.location}</span>
            </div>
            <div className="listing-meta-right">
              <span>Share</span>
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>

      <div className="listing-image-grid">
        <img src={listing.img} alt={listing.title} className="grid-img main-img" />
        <img src={extraImages[0]} alt="Interior" className="grid-img" />
        <img src={extraImages[1]} alt="Interior" className="grid-img top-right-img" />
        <img src={extraImages[2]} alt="Interior" className="grid-img" />
        <img src={extraImages[3]} alt="Interior" className="grid-img bottom-right-img" />
      </div>

      <div className="listing-content-grid">
        <div className="listing-info-section">
          <div className="host-info">
            <div>
              <h2>Entire home hosted by Elias</h2>
              <p>2 guests · 1 bedroom · 1 bed · 1 bath</p>
            </div>
            <img src="https://i.pravatar.cc/150?u=elias" alt="Host" className="host-avatar" />
          </div>

          <div className="listing-description">
            <p>Enjoy a stylish experience at this centrally-located home in Kigali. In premises restaurant and coffee.</p>
            <p>The space is minimalist and designed for comfort...</p>
          </div>

          <div className="listing-amenities">
            <h3>What this place offers</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <li>🍳 Kitchen</li>
              <li>📶 Wifi</li>
              <li>🚗 Free parking</li>
              <li>❄️ Air conditioning</li>
              <li>📺 TV</li>
            </ul>
          </div>
        </div>

        <div className="listing-booking-sidebar">
          <div className="sidebar-price">
            <span className="price-amount">{listing.price.toLocaleString()} RWF</span>
            <span className="price-label"> / night</span>
          </div>
          
            <div className="booking-selectors">
            <div className="selector-row">
              <div className="selector-item">
                <label>Check-in</label>
                <span>{dayjs(listing.availableFrom).format('MMM D, YYYY')}</span>
              </div>
              <div className="selector-item">
                <label>Checkout</label>
                <span>{dayjs(listing.availableFrom).add(5, 'day').format('MMM D, YYYY')}</span>
              </div>
            </div>
            <div className="guests-selector">
              <label>Guests</label>
              <span>1 guest</span>
            </div>
          </div>

          <button className="reserve-btn" onClick={() => navigate(`/book/${listing.id}`)}>
            Reserve
          </button>
          <p className="wont-be-charged">You won't be charged yet</p>

          <div className="price-breakdown-mini">
            <div className="price-row">
              <span>{listing.price.toLocaleString()} RWF x 2 nights</span>
              <span>{(listing.price * 2).toLocaleString()} RWF</span>
            </div>
            <div className="price-row total">
              <span>Total before taxes</span>
              <span>{(listing.price * 2).toLocaleString()} RWF</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
