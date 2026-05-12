import type { BookingFormData } from '../schemas/booking';
import { useCreateBooking } from '../hooks/useCreateBooking';
import type { Listing } from '../../listings/types';
import dayjs from 'dayjs';

interface Props {
  listing: Listing;
  formData: BookingFormData;
  onBack: () => void;
}

export const StepConfirmation = ({ listing, formData, onBack }: Props) => {
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleConfirm = () => {
    createBooking({
      ...formData,
      listingId: listing.id,
    } as any);
  };

  return (
    <div className="booking-form-step confirmation-step">
      <div className="summary-section">
        <h3>Trip details</h3>
        <div className="summary-row">
          <strong>Dates:</strong>
          <span>{dayjs(formData.checkIn).format('MMM D')} – {dayjs(formData.checkOut).format('MMM D, YYYY')}</span>
        </div>
        <div className="summary-row">
          <strong>Guests:</strong>
          <span>{formData.guests} guest{formData.guests > 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="summary-section">
        <h3>Guest information</h3>
        <p>{formData.name}</p>
        <p>{formData.email}</p>
        <p>{formData.phone}</p>
      </div>

      <div className="summary-section">
        <h3>Payment</h3>
        <p>Visa ending in {formData.card.slice(-4)}</p>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} disabled={isPending} className="secondary-btn">Back</button>
        <button 
          onClick={handleConfirm} 
          disabled={isPending} 
          className="primary-btn confirm-btn"
        >
          {isPending ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};
