import { useMyBookings } from '../hooks/useMyBookings';
import { useCancelBooking } from '../hooks/useCancelBooking';
import { Spinner } from '../../../shared/components/Spinner';
import dayjs from 'dayjs';
import './MyBookings.css';

export const BookingsList = () => {
  const { data: bookings, isLoading, isError, refetch } = useMyBookings();
  const { mutate: cancelBooking } = useCancelBooking();

  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;

  if (isError) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Could not load your bookings</h2>
        <button onClick={() => refetch()} className="primary-btn" style={{ marginTop: '20px' }}>Retry</button>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>No bookings yet</h2>
        <p>When you book a trip, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="container my-bookings-container">
      <h1 className="page-title">My Bookings</h1>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-card-image">
              <img src={booking.listing.img} alt={booking.listing.title} />
              <div className={`status-badge ${booking.status.toLowerCase()}`}>
                {booking.status}
              </div>
            </div>
            <div className="booking-card-content">
              <h3>{booking.listing.title}</h3>
              <p className="booking-dates">
                {dayjs(booking.checkIn).format('MMM D')} – {dayjs(booking.checkOut).format('MMM D, YYYY')}
              </p>
              <div className="booking-meta">
                <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                <span>·</span>
                <span>{booking.totalPrice.toLocaleString()} RWF</span>
              </div>
              <div className="booking-actions">
                {booking.status === 'CONFIRMED' && (
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this booking?')) {
                        cancelBooking(booking.id);
                      }
                    }}
                    className="cancel-btn"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
