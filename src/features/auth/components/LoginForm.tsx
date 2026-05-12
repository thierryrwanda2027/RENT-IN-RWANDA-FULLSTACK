import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Welcome to THIERRY BNB</h2>
      <div className="form-group">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-submit-btn">Continue</button>
    </form>
  );
};
