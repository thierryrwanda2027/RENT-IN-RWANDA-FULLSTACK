import type { Listing } from '../../listings/types';
import type { ListingFormData } from '../schemas/listing';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { listingSchema } from '../schemas/listing';
import { useState } from 'react';

interface Props {
  initialData?: Listing;
  onSubmit: (data: ListingFormData) => void;
  isLoading?: boolean;
}

export const ListingForm = ({ initialData, onSubmit, isLoading }: Props) => {
  const [preview, setPreview] = useState<string | null>(initialData?.img || null);

  const { register, handleSubmit, formState: { errors } } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      location: '',
      price: 50000,
      category: 'city',
      superhost: false,
      available: true,
      availableFrom: new Date().toISOString().split('T')[0],
      img: '',
    }
  });


  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="host-listing-form">
      <div className="form-group">
        <label>Title (min 10 chars)</label>
        <input {...register('title')} placeholder="Luxury Apartment in Kigali" />
        {errors.title && <span className="error-msg">{errors.title.message}</span>}
      </div>

      <div className="form-group">
        <label>Description (min 50 chars)</label>
        <textarea {...register('description')} rows={4} placeholder="Detailed description of the space..." />
        {errors.description && <span className="error-msg">{errors.description.message}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <input {...register('location')} placeholder="Kigali, Rwanda" />
          {errors.location && <span className="error-msg">{errors.location.message}</span>}
        </div>
        <div className="form-group">
          <label>Price (RWF / night)</label>
          <input type="number" {...register('price', { valueAsNumber: true })} />
          {errors.price && <span className="error-msg">{errors.price.message}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select {...register('category')}>
            <option value="city">City</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="countryside">Countryside</option>
          </select>
        </div>
        <div className="form-group">
          <label>Available From</label>
          <input type="date" {...register('availableFrom')} />
          {errors.availableFrom && <span className="error-msg">{errors.availableFrom.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input {...register('img')} placeholder="https://..." onChange={(e) => setPreview(e.target.value)} />
        {errors.img && <span className="error-msg">{errors.img.message}</span>}
        {preview && (
          <div className="image-preview" style={{ marginTop: '10px' }}>
            <img src={preview} alt="Listing preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        )}
      </div>

      <div className="form-toggles">
        <label className="toggle">
          <input type="checkbox" {...register('superhost')} />
          <span>Superhost</span>
        </label>
        <label className="toggle">
          <input type="checkbox" {...register('available')} />
          <span>Currently Available</span>
        </label>
      </div>

      <button type="submit" className="primary-btn" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Listing'}
      </button>
    </form>
  );
};
