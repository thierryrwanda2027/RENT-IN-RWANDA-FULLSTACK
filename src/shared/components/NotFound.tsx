import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1>404 - Page Not Found</h1>
      <p style={{ marginBottom: '24px' }}>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>
        Go back home
      </Link>
    </div>
  );
};
