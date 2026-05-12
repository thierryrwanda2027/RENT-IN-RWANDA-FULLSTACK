import { useParams, useNavigate } from 'react-router-dom';
import { useListing } from '../../listings/hooks/useListing';
import { useUpdateListing } from '../hooks/hostHooks';
import { ListingForm } from '../components/ListingForm';
import { Spinner } from '../../../shared/components/Spinner';

import type { ListingFormData } from '../schemas/listing';

export const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(id);
  const { mutate: updateListing, isPending } = useUpdateListing(id);

  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;
  if (!listing) return <div className="container">Listing not found</div>;

  const handleSubmit = (data: ListingFormData) => {
    updateListing(data, {
      onSuccess: () => navigate('/host')
    });
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <h1>Edit Listing</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>Update your listing details below.</p>
      <ListingForm initialData={listing} onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
};
