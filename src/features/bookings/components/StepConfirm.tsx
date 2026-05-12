import React from 'react'
import type { BookingData } from '../schemas/booking'
import dayjs from 'dayjs'

interface Props {
  data: Partial<BookingData>
  onConfirm: () => void
  onBack: () => void
  isPending: boolean
}

export const StepConfirm: React.FC<Props> = ({ data, onConfirm, onBack, isPending }) => {
  return (
    <div className="booking-confirm">
      <h3>Step 4: Review and Confirm</h3>
      
      <div className="final-review-details">
        <p><strong>Your Reservation Details</strong></p>
        <div className="review-section">
          <p><span>Dates:</span> {dayjs(data.checkIn).format('MMM D')} – {dayjs(data.checkOut).format('MMM D, YYYY')}</p>
          <p><span>Guests:</span> {data.guests} {data.guests === 1 ? 'guest' : 'guests'}</p>
        </div>
        
        <div className="review-section">
          <p><span>Traveler:</span> {data.name}</p>
          <p><span>Contact:</span> {data.email} · {data.phone}</p>
        </div>

        <div className="cancellation-policy">
          <h4>Cancellation policy</h4>
          <p>Free cancellation before {dayjs(data.checkIn).subtract(2, 'days').format('MMM D')}. After that, the booking is non-refundable.</p>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} disabled={isPending} className="back-btn">Back</button>
        <button type="button" onClick={onConfirm} disabled={isPending} className="confirm-btn">
          {isPending ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}
