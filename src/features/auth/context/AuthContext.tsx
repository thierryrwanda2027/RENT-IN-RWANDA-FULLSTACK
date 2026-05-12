import React, { createContext, useState, type ReactNode } from 'react';
import type { AuthContextType } from '../types';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = async (email: string, _password: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock success for any credentials
      const dummyToken = `mock_token_${btoa(email)}`;
      localStorage.setItem('token', dummyToken);
      setIsAuthenticated(true);
      toast.success('Successfully logged in!');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
