import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingStep1Schema } from '../schemas/booking';

import type { BookingFormData } from '../schemas/booking';

interface Props {
  initialData: Partial<BookingFormData>;
  onNext: (data: Partial<BookingFormData>) => void;
}

export const StepDates = ({ initialData, onNext }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingStep1Schema),
    defaultValues: {
      checkIn: initialData.checkIn || '',
      checkOut: initialData.checkOut || '',
      guests: initialData.guests || 1,
    }
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="booking-form-step">
      <div className="form-group">
        <label>Check-in</label>
        <input type="date" {...register('checkIn')} className={errors.checkIn ? 'error' : ''} />
        {errors.checkIn && <span className="error-msg">{errors.checkIn.message as string}</span>}
      </div>

      <div className="form-group">
        <label>Check-out</label>
        <input type="date" {...register('checkOut')} className={errors.checkOut ? 'error' : ''} />
        {errors.checkOut && <span className="error-msg">{errors.checkOut.message as string}</span>}
      </div>

      <div className="form-group">
        <label>Guests</label>
        <input type="number" {...register('guests', { valueAsNumber: true })} className={errors.guests ? 'error' : ''} />
        {errors.guests && <span className="error-msg">{errors.guests.message as string}</span>}
      </div>

      <button type="submit" className="primary-btn">Next</button>
    </form>
  );
};
