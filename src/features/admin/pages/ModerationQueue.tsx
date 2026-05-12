import { usePendingListings, useApproveListing, useRejectListing } from '../hooks/adminHooks';
import { Spinner } from '../../../shared/components/Spinner';

export const ModerationQueue = () => {
  const { data: pending, isLoading } = usePendingListings();
  const { mutate: approve } = useApproveListing();
  const { mutate: reject } = useRejectListing();

  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;

  if (!pending || pending.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>No listings pending approval</h2>
        <p>All property listings have been moderated.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Moderation Queue</h1>
      <div className="moderation-list" style={{ marginTop: '30px' }}>
        {pending.map((listing) => (
          <div key={listing.id} className="moderation-card" style={{ 
            display: 'flex', 
            gap: '20px', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '12px',
            marginBottom: '20px',
            background: '#fff'
          }}>
            <img src={listing.img} alt={listing.title} style={{ width: '200px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ flex: 1 }}>
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <p style={{ margin: '10px 0', fontSize: '14px', color: '#666' }}>{listing.description.substring(0, 150)}...</p>
              <div style={{ fontWeight: 'bold' }}>{listing.price.toLocaleString()} RWF / night</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={() => approve(listing.id)} 
                className="primary-btn" 
                style={{ background: '#22c55e' }}
              >
                Approve
              </button>
              <button 
                onClick={() => reject(listing.id)} 
                className="secondary-btn" 
                style={{ color: '#ef4444', borderColor: '#ef4444' }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
