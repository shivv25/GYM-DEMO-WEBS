import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const TOKEN_KEY = 'neurofit_admin_token';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = useCallback(async () => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/profile');
      setAdmin(response.data);
      setToken(currentToken);
    } catch (error) {
      console.error('Failed to verify token:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, admin: adminData } = response.data;
      
      localStorage.setItem(TOKEN_KEY, token);
      setToken(token);
      setAdmin(adminData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdmin(null);
  };

  return {
    token,
    admin,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  };
};

export default useAuth;
