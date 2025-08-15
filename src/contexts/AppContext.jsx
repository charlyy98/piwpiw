import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';
import { mockApi } from '../api/mockApi.js'; // Use the mock API for avatar upload

const AppContext = createContext();

// Export hook for accessing app context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false
  const [user, setUser] = useState(null); // Default to null, will be populated on login

  // Load saved preferences from localStorage
  useEffect(() => {
    console.log('Loading saved preferences from localStorage');
    const savedLanguage = localStorage.getItem('piwpiw-language');
    const savedTheme = localStorage.getItem('piwpiw-theme');
    const savedUser = localStorage.getItem('piwpiw-user');

    if (savedLanguage) {
      setLanguage(savedLanguage);
      console.log('Loaded language:', savedLanguage);
    }
    if (savedTheme) {
      setTheme(savedTheme);
      console.log('Loaded theme:', savedTheme);
    }
    // Atomically load user and auth state to prevent inconsistencies
    if (localStorage.getItem('piwpiw-auth') === 'true' && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Ensure userData is a valid object before setting auth state
        if (userData && userData.id) {
          setUser(userData);
          setIsAuthenticated(true);
          console.log('✅ Successfully loaded user and authenticated:', userData);
        } else {
          throw new Error('Parsed user data is invalid or missing ID.');
        }
      } catch (error) {
        console.error('❌ Corrupted user data in localStorage. Clearing auth state.', error);
        // Clear corrupted data and ensure user is logged out
        localStorage.removeItem('piwpiw-auth');
        localStorage.removeItem('piwpiw-user');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('piwpiw-language', newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('piwpiw-theme', newTheme);
  };

  const login = (userData) => {
    console.log('🔐 Login function called with userData:', userData);
    console.log('🖼️ Avatar being set:', userData?.avatar);
    console.log('👤 Username being set:', userData?.username);
    
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('piwpiw-auth', 'true');
    localStorage.setItem('piwpiw-user', JSON.stringify(userData));
    console.log('✅ User logged in and stored:', userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('piwpiw-auth');
    localStorage.removeItem('piwpiw-user');
    
    // Clear the URL hash to ensure we go back to login page
    if (typeof window !== 'undefined') {
      window.location.hash = '';
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    console.log('User logged out');
  };


  // Debug effect to log auth state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user: user?.username });
  }, [isAuthenticated, user]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const updateAvatar = async (file) => {
    // Add a guard clause to ensure user object is available
    if (!user || !user.id) {
      console.error('Avatar update failed: User is not available.');
      return { success: false, error: 'User not authenticated or data is missing.' };
    }
    try {
      const response = await mockApi.uploadAvatar(user.id, file);
      if (response.success) {
        const updatedUser = {
          ...user,
          avatar: response.data.avatarUrl
        };
        setUser(updatedUser);
        localStorage.setItem('piwpiw-user', JSON.stringify(updatedUser));
        return { success: true };
      }
      return { success: false, error: 'Failed to update avatar' };
    } catch (error) {
      console.error('Avatar update failed:', error);
      return { success: false, error: error.message || 'Failed to update avatar' };
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('piwpiw-user', JSON.stringify(userData));
    console.log('User data updated:', userData);
  };

  const value = {
    language,
    theme,
    isAuthenticated,
    user,
    toggleLanguage,
    toggleTheme,
    login,
    logout,
    updateAvatar,
    updateUser,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
