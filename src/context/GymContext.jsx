import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import gymConfig from '../data/gymConfig';

const GymContext = createContext(null);

export function GymProvider({ children }) {
  const [gymData, setGymData] = useState(gymConfig);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Apply theme CSS variables whenever branding changes
  const applyTheme = useCallback((branding) => {
    if (!branding) return;
    const root = document.documentElement;
    if (branding.primaryColor) {
      root.style.setProperty('--color-accent', branding.primaryColor);
      // Convert hex to RGB for rgba() usage
      const hex = branding.primaryColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      root.style.setProperty('--color-accent-rgb', `${r}, ${g}, ${b}`);
      // Darken for hover
      root.style.setProperty('--color-accent-hover', branding.primaryColor + 'DD');
    }
    if (branding.secondaryColor) {
      root.style.setProperty('--color-accent-secondary', branding.secondaryColor);
    }
    if (branding.backgroundColor) {
      root.style.setProperty('--color-bg', branding.backgroundColor);
    }
  }, []);

  // Try to fetch from API, fallback to static config
  useEffect(() => {
    const fetchGymData = async () => {
      try {
        const response = await fetch('/api/gym');
        if (response.ok) {
          const data = await response.json();
          if (data && data.name) {
            // Merge API data with static defaults (API data takes priority)
            const merged = { ...gymConfig, ...data };
            setGymData(merged);
            setIsBackendConnected(true);
            applyTheme(merged.branding);
          }
        }
      } catch {
        // Backend not available — use static config (this is fine for demo mode)
        console.info('Running in demo mode (no backend connected). Using static gymConfig.');
      } finally {
        setLoading(false);
        applyTheme(gymConfig.branding);
      }
    };

    fetchGymData();
  }, [applyTheme]);

  // Method to update gym data (used by admin dashboard)
  const updateGymData = useCallback((newData) => {
    setGymData(prev => {
      const updated = { ...prev, ...newData };
      if (newData.branding) {
        applyTheme(newData.branding);
      }
      return updated;
    });
  }, [applyTheme]);

  const value = {
    gym: gymData,
    loading,
    isBackendConnected,
    updateGymData,
  };

  return (
    <GymContext.Provider value={value}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
}

export default GymContext;
