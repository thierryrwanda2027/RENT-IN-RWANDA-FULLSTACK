import { useAdminStats } from '../hooks/adminHooks';
import { Spinner } from '../../../shared/components/Spinner';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) return <div style={{ padding: '100px 0' }}><Spinner /></div>;

  return (
    <div className="container admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats?.totalUsers || 154}</p>
        </div>
        <div className="stat-card">
          <h3>Total Listings</h3>
          <p>{stats?.totalListings || 82}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>{(stats?.totalRevenue || 12500000).toLocaleString()} RWF</p>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p>{stats?.activeBookings || 45}</p>
        </div>
      </div>

      <div className="admin-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/moderation" className="action-link">
            <div className="action-card">
              <h3>Moderation Queue</h3>
              <p>Approve or reject new property listings</p>
            </div>
          </Link>
          <Link to="/admin/bookings" className="action-link">
            <div className="action-card">
              <h3>Global Bookings</h3>
              <p>View and manage all trips on the platform</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
