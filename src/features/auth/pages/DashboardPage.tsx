import React from 'react';
import { useStore } from '../../../store/StoreContext';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../../bookings/hooks/useBookings';
import { withAuth } from '../../../shared/hocs/withAuth';

const DashboardComponent: React.FC = () => {
  const { state } = useStore();
  const { logout } = useAuth();
  const { data: bookings } = useBookings();
  
  // Support both array length (if stored as IDs) or fallback to 0
  const savedCount = Array.isArray(state.saved) ? state.saved.length : 0;
  const bookingsCount = bookings?.length || 0;

  return (
    <div className="page-container">
      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2>Welcome to your Dashboard</h2>
          <button 
            onClick={logout}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #222', borderRadius: '8px', cursor: 'pointer' }}
          >
            Log out
          </button>
        </div>
        
        <div style={{ background: '#f7f7f7', padding: '24px', borderRadius: '12px' }}>
          <h3>Your Activity</h3>
          <p>You have <strong>{savedCount}</strong> saved listings.</p>
          <p>You have <strong>{bookingsCount}</strong> active bookings.</p>
        </div>
      </div>
    </div>
  );
};

export const DashboardPage = withAuth(DashboardComponent);
