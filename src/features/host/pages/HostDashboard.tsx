import { useMyListings, useDeleteListing } from '../hooks/hostHooks';
import { Spinner } from '../../../shared/components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import './HostDashboard.css';

export const HostDashboard = () => {
  const { data: listings, isLoading } = useMyListings();
  const { mutate: deleteListing } = useDeleteListing();
  const navigate = useNavigate();

  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;

  return (
    <div className="container host-dashboard">
      <div className="dashboard-header">
        <h1>Host Dashboard</h1>
        <Link to="/host/create" className="primary-btn">Create New Listing</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Listings</h3>
          <p>{listings?.length || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>24</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p>1,250,000 RWF</p>
        </div>
      </div>

      <div className="my-listings-section">
        <h2>My Listings</h2>
        <div className="host-listings-grid">
          {listings?.map((listing) => (
            <div key={listing.id} className="host-listing-card">
              <img src={listing.img} alt={listing.title} />
              <div className="card-details">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <div className="card-price">{listing.price.toLocaleString()} RWF / night</div>
                <div className="card-actions">
                  <button onClick={() => navigate(`/host/edit/${listing.id}`)} className="edit-btn">Edit</button>
                  <button 
                    onClick={() => {
                      if (confirm('Delete this listing?')) deleteListing(listing.id);
                    }} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <Link to={`/listings/${listing.id}`} className="view-btn">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
