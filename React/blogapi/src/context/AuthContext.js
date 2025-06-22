import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('user/me/');
      setIsAuthenticated(true);
      setIsAdmin(res.data.is_superuser); // ✅ gets admin flag
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const login = async () => {
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
