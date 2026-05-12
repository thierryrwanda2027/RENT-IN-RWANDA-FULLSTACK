import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingStep3Schema } from '../schemas/booking';

import type { BookingFormData } from '../schemas/booking';

interface Props {
  initialData: Partial<BookingFormData>;
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export const StepPayment = ({ initialData, onNext, onBack }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingStep3Schema),
    defaultValues: {
      card: initialData.card || '',
      expiry: initialData.expiry || '',
      cvv: initialData.cvv || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="booking-form-step">
      <div className="form-group">
        <label>Card Number</label>
        <input {...register('card')} placeholder="0000 0000 0000 0000" maxLength={16} />
        {errors.card && <span className="error-msg">{errors.card.message as string}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Expiry Date</label>
          <input {...register('expiry')} placeholder="MM/YY" maxLength={5} />
          {errors.expiry && <span className="error-msg">{errors.expiry.message as string}</span>}
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input {...register('cvv')} placeholder="123" maxLength={3} />
          {errors.cvv && <span className="error-msg">{errors.cvv.message as string}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} className="secondary-btn">Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
};
