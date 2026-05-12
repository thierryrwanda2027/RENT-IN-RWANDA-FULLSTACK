import { ListingForm } from '../components/ListingForm';
import { useCreateListing } from '../hooks/hostHooks';
import { useNavigate } from 'react-router-dom';

import type { ListingFormData } from '../schemas/listing';

export const CreateListingPage = () => {
  const { mutate: createListing, isPending } = useCreateListing();
  const navigate = useNavigate();

  const handleSubmit = (data: ListingFormData) => {
    createListing(data, {
      onSuccess: () => navigate('/host')
    });
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <h1>Create New Listing</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Share your home with the world.</p>
      <ListingForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
};
