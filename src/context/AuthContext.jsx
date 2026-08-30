import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('neurofit_admin_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('neurofit_admin_token');
    setToken(null);
    setAdmin(null);
  }, []);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setAdmin(res.data.data);
        } else {
          logout();
        }
      } catch {
        // Token invalid or backend not available — clear but don't crash
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token, logout]);

  const login = useCallback(async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    if (res.data.success) {
      const { token: newToken, admin: adminData } = res.data.data;
      localStorage.setItem('neurofit_admin_token', newToken);
      setToken(newToken);
      setAdmin(adminData);
      return { success: true };
    }
    return { success: false, message: res.data.message };
  }, []);

  const value = {
    token,
    admin,
    loading,
    isAuthenticated: !!token && !!admin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
