import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const navigate = useNavigate();

  const user = {
    name: 'Alex Rivera',
    email: 'alex@manara.com',
    level: 'Beginner',
    plan: 'Premium'
  };

  const login = (redirectPath = '/dashboard') => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    navigate(redirectPath);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
