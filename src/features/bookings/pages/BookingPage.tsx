import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useListing } from '../../listings/hooks/useListing';
import { Spinner } from '../../../shared/components/Spinner';
import { StepDates } from '../components/StepDates';
import { StepGuestInfo } from '../components/StepGuestInfo';
import { StepPayment } from '../components/StepPayment';
import { StepConfirmation } from '../components/StepConfirmation';
import type { BookingFormData } from '../schemas/booking';
import './BookingPage.css';

export const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listing, isLoading, isError } = useListing(id);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({});

  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;
  if (isError || !listing) return <div className="container">Listing not found</div>;

  const nextStep = (data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="booking-page-container container">
      <div className="booking-layout">
        <div className="booking-main">
          <div className="booking-steps-nav">
            <button onClick={() => navigate(-1)} className="back-link">←</button>
            <div className="steps-indicator">
              Step {step} of 4
            </div>
          </div>

          <h1 className="step-title">
            {step === 1 && "Confirm your dates"}
            {step === 2 && "Who's coming?"}
            {step === 3 && "Payment details"}
            {step === 4 && "Confirm and pay"}
          </h1>

          {step === 1 && (
            <StepDates 
              initialData={formData} 
              onNext={nextStep} 
            />
          )}
          {step === 2 && (
            <StepGuestInfo 
              initialData={formData} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 3 && (
            <StepPayment 
              initialData={formData} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 4 && (
            <StepConfirmation 
              listing={listing}
              formData={formData as BookingFormData} 
              onBack={prevStep} 
            />
          )}
        </div>

        <div className="booking-sidebar">
          <div className="listing-mini-card">
            <img src={listing.img} alt={listing.title} />
            <div className="mini-card-info">
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <div className="mini-card-rating">
                ★ {listing.rating} (10 reviews)
              </div>
            </div>
          </div>
          <hr />
          <div className="price-details">
            <h3>Price details</h3>
            <div className="price-row">
              <span>{listing.price.toLocaleString()} RWF x 5 nights</span>
              <span>{(listing.price * 5).toLocaleString()} RWF</span>
            </div>
            <div className="price-row total">
              <span>Total (RWF)</span>
              <span>{(listing.price * 5).toLocaleString()} RWF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
