import React from 'react'
import type { BookingData } from '../schemas/booking'
import type { Listing } from '../../listings/types'
import dayjs from 'dayjs'

interface Props {
  data: Partial<BookingData>
  listing: Listing
}

export const BookingSummary: React.FC<Props> = ({ data, listing }) => {
  const checkIn = data.checkIn || dayjs().toISOString();
  const checkOut = data.checkOut || dayjs().add(2, 'day').toISOString();

  const nights = dayjs(checkOut).diff(dayjs(checkIn), 'day') || 2;
  const pricePerNight = listing.price;
  const subtotal = pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + taxes;

  return (
    <div className="booking-summary-card">
      <div className="summary-listing-info">
        <img src={listing.img} alt={listing.title} />
        <div className="summary-listing-details">
          <span className="listing-type">{listing.category}</span>
          <h4 className="listing-name">{listing.title}</h4>
          <p className="rating">★ {listing.rating} (30)</p>
        </div>
      </div>

      <div className="price-details-section">
        <h3>Price details</h3>
        <div className="price-row">
          <span>{pricePerNight.toLocaleString()} RWF x {nights} nights</span>
          <span>{subtotal.toLocaleString()} RWF</span>
        </div>
        <div className="price-row">
          <span>Taxes and fees</span>
          <span>{taxes.toLocaleString()} RWF</span>
        </div>
        
        <div className="price-row total">
          <span>Total (RWF)</span>
          <span>{total.toLocaleString()} RWF</span>
        </div>
      </div>

      <div className="credit-badge">
        <span className="icon">🏷️</span>
        <span>Get 35,000 RWF in Airbnb credit after your stay</span>
      </div>
    </div>
  )
}
