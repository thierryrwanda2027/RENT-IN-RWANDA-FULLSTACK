import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingStep2Schema } from '../schemas/booking';

import type { BookingFormData } from '../schemas/booking';

interface Props {
  initialData: Partial<BookingFormData>;
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export const StepGuestInfo = ({ initialData, onNext, onBack }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingStep2Schema),
    defaultValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File must be under 5MB');
        setPreview(null);
        return;
      }
      setFileError(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="booking-form-step">
      <div className="form-group">
        <label>Full Name</label>
        <input {...register('name')} placeholder="Elias Habimana" />
        {errors.name && <span className="error-msg">{errors.name.message as string}</span>}
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input {...register('email')} placeholder="elias@example.com" />
        {errors.email && <span className="error-msg">{errors.email.message as string}</span>}
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input {...register('phone')} placeholder="+250..." />
        {errors.phone && <span className="error-msg">{errors.phone.message as string}</span>}
      </div>

      <div className="form-group">
        <label>Profile Photo (Max 5MB)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {fileError && <span className="error-msg">{fileError}</span>}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginTop: '10px' }} />
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onBack} className="secondary-btn">Back</button>
        <button type="submit" className="primary-btn">Next</button>
      </div>
    </form>
  );
};
